import { IsDate, IsString } from 'class-validator';

export class SessionUserDto {
  @IsString()
  userId: string;

  @IsString()
  token: string;

  @IsDate()
  createdAt: string;

  @IsDate()
  expiresAt: string;
}
