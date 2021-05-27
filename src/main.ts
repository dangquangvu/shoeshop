import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {SwaggerModule, DocumentBuilder} from '@nestjs/swagger';
import {warn} from 'console';
import * as logger from 'morgan';
import * as chalk from 'chalk';
import {CORS_EXPOSED_HEADERS} from './shared/constants';

async function bootstrap() {
  const morganMiddleware = logger(function(tokens, req, res) {
    return [
      chalk.hex('#ff4757').bold('🍄  Morgan --> '),
      chalk.hex('#34ace0').bold(tokens.method(req, res)),
      chalk.hex('#ffb142').bold(tokens.status(req, res)),
      chalk.hex('#ff5252').bold(tokens.url(req, res)),
      chalk.hex('#2ed573').bold(tokens['response-time'](req, res) + ' ms'),
      chalk.hex('#f78fb3').bold('@ ' + tokens.date(req, res)),
    ].join(' ');
  });
  const app = await NestFactory.create(AppModule);
  const options = new DocumentBuilder()
    .setTitle('SHOESHOP API')
    .setDescription('Swagger docs for shoe shop project')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options, {
    include: [],
  });
  SwaggerModule.setup('docs', app, document);
  const PORT = process.env.PORT || 3001;
  app.enableCors({
    exposedHeaders: CORS_EXPOSED_HEADERS,
  });
  app.use(logger(':method :url :status :res[content-length] - :response-time ms'));
  app.use(morganMiddleware);
  await app.listen(PORT);
  warn('Swagger run on', `http://127.0.0.1:${PORT}/docs`);
  warn('Server run on', `http://127.0.0.1:${PORT}/`);
}
bootstrap();
