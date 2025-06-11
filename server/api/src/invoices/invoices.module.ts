/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { InvoicesController } from './invoices.controller';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  controllers: [InvoicesController],
  providers: [PrismaService],
})
export class InvoicesModule {}
