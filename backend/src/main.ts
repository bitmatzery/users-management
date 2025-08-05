import { NestFactory } from '@nestjs/core'
import { ConfigService } from '@nestjs/config'
import { AppModule } from './app.module'
import {HttpExceptionFilter} from "./common/http-exception.filter";

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const config = await app.get(ConfigService)
  const port = config.get<number>('API_PORT')

  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(port || 4000, () => {
    try {
      console.log(`App started on port: ${port}`)
    }
    catch(err) {
      console.error('Error starting server:', err)
    }
  })
}

bootstrap()
