import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Property } from './entities/property.entity';

@Injectable()
export class PropertyService {
  constructor(
    @InjectRepository(Property)
    private readonly propertyRepository: Repository<Property>,
  ) {}

  async allProperties() {
    try {
      const properties = await this.propertyRepository.find();

      //   if (!result)
      //     throw new UnauthorizedException('Credentials are not valid (user)');

      //   return {
      //     user,
      //     token,
      //   };

      return properties;
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  private handleDBErrors(error: any) {
    if (error instanceof UnauthorizedException) throw error;
    if (error.code == '23505') throw new BadRequestException(error.detail);
    console.log(error);
    throw new InternalServerErrorException('Please check server logs');
  }
}
