import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { FormModule } from './form/form.module';
import { ResponseModule } from './response/response.module';
import { DatabaseService } from './common/database.service';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),
    FormModule,
    ResponseModule,
  ],
  controllers: [AppController],
  providers: [DatabaseService],
})
export class AppModule {}
