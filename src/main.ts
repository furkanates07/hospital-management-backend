import { NestFactory } from '@nestjs/core';
import mongoose, { ConnectOptions } from 'mongoose';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const dbURI = process.env.DB_URI;

  await mongoose.connect(dbURI, { useUnifiedTopology: true } as ConnectOptions);
  console.log('MongoDB connection successful!');

  await app.listen(3000);
  console.log('NestJS application is running on port 3000!');
}
bootstrap();
