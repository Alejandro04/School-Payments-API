/* eslint-disable no-var */
/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Payment } from './payment.interface';
import { AirtableService } from './airtable.service';

@Injectable()
export class AppService {

  constructor(
    private airtableService: AirtableService
  ){}

  getPayments(): Payment[] {
    return this.airtableService.getPayments();
  }


  savePayment(payment: Payment):Payment {
    return this.airtableService.savePayment(payment);
  }
}
