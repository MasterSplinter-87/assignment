/* eslint-disable prettier/prettier */
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

void (async function main() {
  try {
    const password = await bcrypt.hash('testpass123', 10);

    const user = await prisma.user.create({
      data: {
        email: 'test0@example.com',
        name: 'Test User 0',
        password,
      },
    });

    console.log('User created');

    await prisma.invoice.createMany({
      data: [
        {
          vendor_name: 'Acme Corp',
          amount: 199.99,
          due_date: new Date('2025-07-01'),
          description: 'Consulting services',
          paid: false,
          user_id: user.id,
        },
        {
          vendor_name: 'Globex Inc.',
          amount: 420.0,
          due_date: new Date('2025-08-01'),
          description: 'Web hosting',
          paid: true,
          user_id: user.id,
        },
        {
          vendor_name: 'Parse Inc.',
          amount: 1420.0,
          due_date: new Date('2025-09-01'),
          description: 'Web Design',
          paid: false,
          user_id: user.id,
        },
        {
          vendor_name: 'Giga Inc.',
          amount: 3420.0,
          due_date: new Date('2025-08-04'),
          description: 'Stocks Trading',
          paid: true,
          user_id: user.id,
        },
        {
          vendor_name: 'Timex Inc.',
          amount: 620.0,
          due_date: new Date('2025-11-01'),
          description: 'Fire Shop',
          paid: false,
          user_id: user.id,
        },
        {
          vendor_name: 'Global Warm Inc.',
          amount: 60.0,
          due_date: new Date('2025-11-03'),
          description: 'Awerness',
          paid: true,
          user_id: user.id,
        },
        {
          vendor_name: 'Compass Ltd.',
          amount: 4420.0,
          due_date: new Date('2025-12-04'),
          description: 'Compass description goes here',
          paid: false,
          user_id: user.id,
        },
        {
          vendor_name: 'Inditex Inc.',
          amount: 1420.0,
          due_date: new Date('2025-08-03'),
          description: 'Clothing',
          paid: true,
          user_id: user.id,
        },
        {
          vendor_name: 'Autotrade Inc.',
          amount: 13420.0,
          due_date: new Date('2025-08-02'),
          description: 'Cars Dealer',
          paid: true,
          user_id: user.id,
        },
        {
          vendor_name: 'Pharmacy Inc.',
          amount: 2420.0,
          due_date: new Date('2025-03-01'),
          description: 'Drug store',
          paid: true,
          user_id: user.id,
        },
        {
          vendor_name: 'Service Inc.',
          amount: 320.0,
          due_date: new Date('2025-06-01'),
          description: 'Fixing your automobile',
          paid: false,
          user_id: user.id,
        },
        {
          vendor_name: 'Fast Food Inc.',
          amount: 20.0,
          due_date: new Date('2025-08-07'),
          description: 'Get your sandwich right here',
          paid: true,
          user_id: user.id,
        },
        {
          vendor_name: 'Ice Cream Inc.',
          amount: 10.0,
          due_date: new Date('2025-04-01'),
          description: 'Delicious ice cream at your service',
          paid: true,
          user_id: user.id,
        },
        {
          vendor_name: 'Forrest Inc.',
          amount: 1420.0,
          due_date: new Date('2025-09-03'),
          description: 'Forrest point to deliver wood',
          paid: true,
          user_id: user.id,
        },
        {
          vendor_name: 'Motor Inc.',
          amount: 44420.0,
          due_date: new Date('2025-02-06'),
          description: 'Motorcycle company with custom bobbers',
          paid: false,
          user_id: user.id,
        },
      ],
    });
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
})();
