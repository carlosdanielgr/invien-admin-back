import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PropertyController } from './property.controller';
import { PropertyService } from './property.service';
import { Property } from './entities/property.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Property]), AuthModule],
  controllers: [PropertyController],
  providers: [PropertyService],
})
export class PropertyModule {}
