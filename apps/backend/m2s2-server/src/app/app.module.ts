import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '123',
      database: 'm2s2',
      entities: [],
      // entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
      // synchronize: process.env['SYNCHRONIZE'] === 'true',
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // {
    //   provide: APP_PIPE,
    //   useClass: GlobalValidationPipe,
    // },
  ],
})
export class AppModule {}
