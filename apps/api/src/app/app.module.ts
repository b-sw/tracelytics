import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EventsModule } from '@tracelytics/backend/events';

import { AppService } from './app.service';

@Module({
    imports: [
        EventsModule,
        MongooseModule.forRoot(
            `mongodb://${process.env['MONGO_DB_LOGIN']}:${process.env['MONGO_DB_PASSWORD']}@${process.env['MONGO_DB_HOST']}:${process.env['MONGO_DB_PORT']}/${process.env['MONGO_DB_NAME']}`,
        ),
    ],
    controllers: [],
    providers: [AppService],
})
export class AppModule {}
