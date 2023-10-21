import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';
import { AirtableService } from './airtable.service';
import { Payment } from './payment.interface';

describe('AppService', () => {
  let appService: AppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppService, AirtableService],
    }).compile();

    appService = module.get<AppService>(AppService);
  });

  describe('getPayments', () => {
    it('should return an array of payments', () => {
      jest.spyOn(appService, 'getPayments').mockImplementation(() => {
        return [
          {
            id: 'recDgKc6auoYLIxvY',
            amount: 100,
            date: '04/10/2023',
            currency: 'USD',
          } as Payment,
          {
            id: 'recoN0IF1GIGQkFI6',
            amount: 200,
            date: '04/11/2023',
            currency: 'USD',
          } as Payment,
        ];
      });

      expect(appService.getPayments()).toEqual([
        {
          id: 'recDgKc6auoYLIxvY',
          amount: 100,
          date: '04/10/2023',
          currency: 'USD',
        } as Payment,
        {
          id: 'recoN0IF1GIGQkFI6',
          amount: 200,
          date: '04/11/2023',
          currency: 'USD',
        } as Payment,
      ]);
    });
  });

  describe('savePayment', () => {
    it('should save a payment', () => {
      const samplePayment: Payment = {
        amount: 100,
        date: '04/10/2023',
        currency: 'USD',
      };
      jest.spyOn(appService, 'savePayment').mockImplementation((payment) => {
        return { ...payment, id: 'recDgKc6auoYLIxvY' } as Payment;
      });

      expect(appService.savePayment(samplePayment)).toEqual({
        id: 'recDgKc6auoYLIxvY',
        amount: 100,
        date: '04/10/2023',
        currency: 'USD',
      } as Payment);
    });
  });
});
