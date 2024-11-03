import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { AuthService } from './auth.service';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const token = request.headers['authorization'];

    if (!token) {
      throw new UnauthorizedException('Token not provided');
    }

    try {
      const session = await this.authService.findSessionByToken(token);
      if (!session || new Date() > session.expiresAt) {
        throw new UnauthorizedException('Token expired or invalid');
      }
    } catch (error) {
      throw new UnauthorizedException(
        error.response.message || 'Invalid token',
      );
    }

    return true;
  }
}
