import { Logger, Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { HttpModule } from '@nestjs/axios';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './modules/user/user.module';
import { DatabaseModule } from './database/database.module';
import { join } from 'path';
const nodeEnv = process.env.NODE_ENV || 'development';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath:
        nodeEnv === 'development'
          ? '.env.development'
          : join(__dirname, `.env.${nodeEnv}`),
      isGlobal: true, // 如果你想让 ConfigModule 在整个应用程序中可用
    }),
    HttpModule,
    DatabaseModule,
    UserModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../web/dist'),
      serveRoot: '/',
    }),
  ],
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
        transform: true,
      }),
    },
  ],
})
export class AppModule {}
