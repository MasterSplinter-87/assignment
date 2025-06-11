/* eslint-disable prettier/prettier */
import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('invoices')
@UseGuards(JwtAuthGuard)
export class InvoicesController {
  constructor(private prisma: PrismaService) {}

  @Get()
  async findAll() {
    return await this.prisma.invoice.findMany();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.prisma.invoice.findUnique({ where: { id: Number(id) } });
  }
}
