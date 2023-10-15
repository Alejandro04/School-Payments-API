import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Payment } from './payment.interface';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getPayments(): Payment[] {
    return this.appService.getPayments();
  }

  savePayment(): Payment {
    return this.appService.savePayment();
  }
}
