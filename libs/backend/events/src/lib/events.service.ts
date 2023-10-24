import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { uuid } from '@tracelytics/shared/utils';
import { Model } from 'mongoose';
import { CreateEventDto } from './dto/create-event.dto';
import { Event } from './event.schema';

@Injectable()
export class EventsService {
    private static readonly SELECT_OPTIONS = { select: { _id: 0, __v: 0 } };

    constructor(@InjectModel(Event.name) private eventModel: Model<Event>) {}

    create(dto: CreateEventDto): Promise<Event> {
        const event = new this.eventModel({ id: uuid(), ...dto });

        return event.save();
    }

    find(id: string): Promise<Event | null> {
        return this.eventModel.findOne({ id }, null, EventsService.SELECT_OPTIONS).exec();
    }

    findAll(): Promise<Event[]> {
        return this.eventModel.find({}, null, EventsService.SELECT_OPTIONS).exec();
    }

    async update(id: string, dto: CreateEventDto): Promise<Event> {
        await this._requireEventExists(id);

        const event = await this.eventModel
            .findOneAndUpdate({ id }, dto, {
                new: true,
                ...EventsService.SELECT_OPTIONS,
            })
            .exec();

        return event as Event;
    }

    async delete(id: string): Promise<void> {
        await this._requireEventExists(id);
        await this.eventModel.findOneAndDelete({ id }).exec();
    }

    private async _requireEventExists(id: string): Promise<void> {
        const event = await this.find(id);

        if (!event) {
            throw new Error('Event not found');
        }
    }
}
