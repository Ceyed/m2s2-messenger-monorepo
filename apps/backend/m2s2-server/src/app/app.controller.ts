import { Controller, Get } from '@nestjs/common';

import { Public } from '@m2s2/backend/shared/guards';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Public()
  getData() {
    return this.appService.getData();
  }
}
