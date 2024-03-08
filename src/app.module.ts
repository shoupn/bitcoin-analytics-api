import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlockEntity } from './block/entities/block.entity';

import { BitcoindModule } from './bitcoind/bitcoin.module';
import { DataSource } from 'typeorm';
import { ImportService } from './import/import.service';
import { ExchangeRateModule } from './exchange-rate/exchange-rate.module';
import { ImportModule } from './import/import.module';

import { TransactionModule } from './transaction/transaction.module';
import { BlockModule } from './block/block.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true,
      logging: ['error'],
    }),
    BitcoindModule,
    ExchangeRateModule,
    ImportModule,
    BlockModule,
    TransactionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
