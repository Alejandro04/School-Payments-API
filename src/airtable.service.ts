/* eslint-disable no-var */
/* eslint-disable prettier/prettier */

import { Payment } from "./payment.interface";
import { ConfigService } from '@nestjs/config';

// eslint-disable-next-line @typescript-eslint/no-var-requires, @typescript-eslint/no-unused-vars, no-var
var Airtable = require('airtable');
Airtable.configure({
  endpointUrl: 'https://api.airtable.com',
  apiKey: ''
});
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const base = Airtable.base('');

export class AirtableService {
  private payments: Payment[] = [];

  // TODO: implement the correct way for import the environments variables
  constructor(private configService: ConfigService) { }

  getPayments(): Payment[] {
    const payments = [];
    this.fetchPayments(payments);
    return this.payments;
  }

  fetchPayments(payments) {
    base('payments').select({
      maxRecords: 100,
      view: "Grid view"
    }).eachPage((records, fetchNextPage) => {
      records.forEach((record) => {
        payments = [...payments, {
          id: record.id,
          date: record.get('date'),
          amount: record.get('amount'),
          currency: record.get('currency')
        }]
      });
      fetchNextPage();
      if (payments.length > 0) this.addPayments(payments);
    }, (err) => {
      if (err) { console.error(err); return; }
    });
  }

  addPayments(payments) {
    this.payments = payments;
  }

  savePayment(payment: Payment) {
    base('payments').create([
      {
        "fields": {
          "date": payment.date,
          "amount": payment.amount,
          "currency": payment.currency
        }
      },

    ], (err, records) => {
      if (err) {
        console.error(err);
        return;
      }
      records.forEach((record) => {
        console.log(record.getId());
        payment = {
          id: record.getId(),
          date: record.get('date'),
          amount: record.get('amount'),
          currency: record.get('currency')
        }
      });
    });

    return payment;
  }
}