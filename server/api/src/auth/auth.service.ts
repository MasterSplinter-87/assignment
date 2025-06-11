/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from '../../prisma/prisma.service';
import { JwtPayload } from './jwt-payload.interface';

interface User {
  id: number;
  email: string;
  password: string;
  name: string;
}

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  async validateUser(email: string, pass: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (user && (await bcrypt.compare(pass, user.password))) {
      const { ...result } = user;
      return result;
    }
    return null;
  }

  login(user: User) {
    const payload: JwtPayload = {
      id: user.id,
      email: user.email,
      name: user.name,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
