import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { JwtPayload } from './interfaces/jwt-payload.interface';
import { LoginUserDto } from './dto/login-user.dto';
import { Session, User } from './entities';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Session)
    private readonly sessionRepository: Repository<Session>,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginUserDto: LoginUserDto) {
    try {
      const { password, user } = loginUserDto;

      const result = await this.userRepository.findOne({
        where: { user },
        select: { user: true, password: true, id: true },
      });

      if (!result)
        throw new UnauthorizedException('Credentials are not valid (user)');
      if (!bcrypt.compareSync(password, result.password))
        throw new UnauthorizedException('Credentials are not valid (password)');

      const token = this.getJwtToken({ id: result.id });
      await this.createSession(result.id, token);
      return {
        user,
        token,
      };
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  async createSession(userId: string, token: string): Promise<Session> {
    const session = this.sessionRepository.create({
      userId,
      token,
      createdAt: new Date(),
      expiresAt: this.calculateExpiryDate(),
    });
    return await this.sessionRepository.save(session);
  }

  private calculateExpiryDate(): Date {
    const date = new Date();
    date.setHours(date.getHours() + 24);
    return date;
  }

  private handleDBErrors(error: any) {
    if (error instanceof UnauthorizedException) throw error;
    if (error.code == '23505') throw new BadRequestException(error.detail);
    console.log(error);
    throw new InternalServerErrorException('Please check server logs');
  }

  private getJwtToken(payload: JwtPayload) {
    return this.jwtService.sign(payload);
  }
}
