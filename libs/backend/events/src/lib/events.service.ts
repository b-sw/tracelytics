import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateEventDto, RegisterEventDto, TrackableEvent } from '@tracelytics/shared/types';
import { Model } from 'mongoose';
import { RegisteredEvent } from './registered-event.schema';

@Injectable()
export class EventsService {
    private static readonly SELECT_OPTIONS = { select: { _id: 0, __v: 0 } };

    constructor(
        @InjectModel(TrackableEvent.name) private trackableEventModel: Model<TrackableEvent>,
        @InjectModel(RegisteredEvent.name) private registeredEventModel: Model<RegisteredEvent>,
    ) {}

    async create(dto: CreateEventDto): Promise<TrackableEvent> {
        await this._requireEventDoesNotExist(dto.name);

        const event = new this.trackableEventModel({ ...dto });

        return event.save();
    }

    async register(eventName: string, dto: RegisterEventDto): Promise<RegisteredEvent> {
        await this._requireEventExists(eventName);

        const event = new this.registeredEventModel({ name: eventName, ...dto });

        return event.save();
    }

    find(name: string): Promise<TrackableEvent | null> {
        return this.trackableEventModel.findOne({ name }, null, EventsService.SELECT_OPTIONS).exec();
    }

    findAll(): Promise<TrackableEvent[]> {
        return this.trackableEventModel.find({}, null, EventsService.SELECT_OPTIONS).exec();
    }

    async update(eventName: string, dto: CreateEventDto): Promise<TrackableEvent> {
        await this._requireEventExists(eventName);

        const event = await this.trackableEventModel
            .findOneAndUpdate({ name: eventName }, dto, {
                new: true,
                ...EventsService.SELECT_OPTIONS,
            })
            .exec();

        return event as TrackableEvent;
    }

    async delete(eventName: string): Promise<void> {
        await this._requireEventExists(eventName);
        await this.trackableEventModel.findOneAndDelete({ name: eventName }).exec();
    }

    private async _requireEventExists(eventName: string): Promise<void> {
        const event = await this.find(eventName);

        if (!event) {
            throw new Error('Event not found');
        }
    }

    private async _requireEventDoesNotExist(eventName: string): Promise<void> {
        const event = await this.find(eventName);

        if (event) {
            throw new Error('Event already exists');
        }
    }
}
