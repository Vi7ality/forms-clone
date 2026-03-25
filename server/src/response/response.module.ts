import { Module } from '@nestjs/common';
import { ResponseService } from './response.service';
import { ResponseResolver } from './response.resolver';
import { DatabaseService } from 'src/common/database.service';

@Module({
  providers: [ResponseService, ResponseResolver, DatabaseService],
})
export class ResponseModule {}
