import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { uuid } from '@tracelytics/shared/utils';
import { Model } from 'mongoose';
import { CreateEventArgs } from './dto/create-event.args';
import { Event } from './event.schema';

@Injectable()
export class EventsService {
    constructor(@InjectModel(Event.name) private eventModel: Model<Event>) {}

    async create(dto: CreateEventArgs): Promise<Event> {
        const createdCat = new this.eventModel({ id: uuid(), ...dto });

        return createdCat.save();
    }

    async find(id: string): Promise<Event | null> {
        return this.eventModel.findOne({ id }).exec();
    }

    async findAll(): Promise<Event[]> {
        return this.eventModel.find().exec();
    }

    async delete(id: string): Promise<void> {
        await this.eventModel.deleteOne({ id }).exec();
    }
}
