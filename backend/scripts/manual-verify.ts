import { PrismaClient } from '@prisma/client';
import axios from 'axios';

const prisma = new PrismaClient();
const API_URL = 'http://localhost:5000/api';

async function manualVerify() {
  try {
    // 1. Get a product ID
    const product = await prisma.product.findFirst();
    if (!product) {
      throw new Error('No products found in the database. Please seed it first.');
    }
    console.log(`✅ Using product ID: ${product.id}`);

    // 2. Get an auth token
    const loginResponse = await axios.post(`${API_URL}/auth/login`, {
      email: 'demo@example.com',
      password: 'password'
    });
    const token = loginResponse.data.token;
    if (!token) {
      throw new Error('Failed to get authentication token.');
    }
    console.log('✅ Successfully obtained auth token.');

    // 3. Create orders sequentially
    const orderPayload = {
      source: 'Manual',
      customerName: 'Manual Test Customer',
      customerEmail: 'manual-test@example.com',
      customerAddress: '456 Verify St',
      items: [
        {
          productId: product.id,
          title: product.name,
          quantity: 1,
          price: product.price
        }
      ]
    };

    const createdOrderNumbers = [];
    for (let i = 0; i < 3; i++) {
      const orderResponse = await axios.post(`${API_URL}/orders`, orderPayload, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const orderNumber = orderResponse.data.order.orderNumber;
      console.log(`✅ Created order: ${orderNumber}`);
      createdOrderNumbers.push(orderNumber);
    }

    console.log('\n🎉 Verification complete. Generated order numbers:');
    console.log(createdOrderNumbers);

    // Manual check: The logged numbers should be sequential (e.g., ORD-004, ORD-005, ORD-006)
    // This confirms the counter is working as expected.

  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('❌ Verification failed:', error.response?.data || error.message);
    } else {
      console.error('❌ An unexpected error occurred:', error);
    }
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

manualVerify();