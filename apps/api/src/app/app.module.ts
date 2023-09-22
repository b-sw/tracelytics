import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { EventsModule } from '@tracelytics/backend/events';

import { AppService } from './app.service';

@Module({
    imports: [
        EventsModule,
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            autoSchemaFile: true,
        }),
        MongooseModule.forRoot(
            `mongodb://${process.env['MONGO_DB_LOGIN']}:${process.env['MONGO_DB_PASSWORD']}@${process.env['MONGO_DB_HOST']}:${process.env['MONGO_DB_PORT']}/${process.env['MONGO_DB_NAME']}`,
        ),
    ],
    controllers: [],
    providers: [AppService],
})
export class AppModule {}
