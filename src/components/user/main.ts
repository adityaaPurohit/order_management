import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from 'src/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe())
  let port =process.env.USER_PORT ?? 3001;
  await app.listen(port).then(()=>{
      console.log(`User service is running on ${port}`)
  });
}
bootstrap();
