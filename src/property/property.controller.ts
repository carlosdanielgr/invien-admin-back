import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from 'src/auth/auth.guard';
import { PropertyService } from './property.service';

@Controller('property')
export class PropertyController {
  constructor(private readonly propertyService: PropertyService) {}

  @UseGuards(JwtAuthGuard)
  @Get('all')
  getProperties() {
    return this.propertyService.allProperties();
  }
}
