import { Module } from '@nestjs/common';
import { TransactionLogsService } from './services/transaction-logs.service';

@Module({
  providers: [TransactionLogsService],
  exports: [TransactionLogsService]
})
export class TransactionLogsModule {}
