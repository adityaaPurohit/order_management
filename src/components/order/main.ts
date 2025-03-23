import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from 'src/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe())
  let port =process.env.ORDER_PORT ?? 3003;
  await app.listen(port).then(()=>{
      console.log(`Order service is running on ${port}`)
  });
}
bootstrap();
