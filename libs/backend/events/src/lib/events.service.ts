import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateEventDto, RegisterEventDto, TrackableEvent } from '@tracelytics/shared/types';
import { uuid } from '@tracelytics/shared/utils';
import { Model } from 'mongoose';
import { EventAlreadyExistsError, EventNotFoundError } from './errors';
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

        const event = await new this.trackableEventModel({ id: uuid(), ...dto }).save();

        return { id: event.id, name: event.name };
    }

    async register(eventId: string, dto: RegisterEventDto): Promise<RegisteredEvent> {
        await this._requireEventExists(eventId);

        const event = await new this.registeredEventModel({ trackableEventId: eventId, ...dto }).save();

        return { trackableEventId: event.trackableEventId, timestamp: event.timestamp };
    }

    private _find(query: { id: string } | { name: string }): Promise<TrackableEvent | null> {
        return this.trackableEventModel.findOne(query, null, EventsService.SELECT_OPTIONS).exec();
    }

    findAll(): Promise<TrackableEvent[]> {
        return this.trackableEventModel.find({}, null, EventsService.SELECT_OPTIONS).exec();
    }

    async update(eventId: string, dto: CreateEventDto): Promise<TrackableEvent> {
        await this._requireEventExists(eventId);

        const event = await this.trackableEventModel
            .findOneAndUpdate({ id: eventId }, dto, {
                new: true,
                ...EventsService.SELECT_OPTIONS,
            })
            .exec();

        return event as TrackableEvent;
    }

    async delete(eventId: string): Promise<void> {
        await this._requireEventExists(eventId);
        await this.trackableEventModel.findOneAndDelete({ id: eventId }).exec();
    }

    private async _requireEventExists(eventId: string): Promise<void> {
        const event = await this._find({ id: eventId });

        if (!event) {
            throw new EventNotFoundError();
        }
    }

    private async _requireEventDoesNotExist(eventName: string): Promise<void> {
        const event = await this._find({ name: eventName });

        if (event) {
            throw new EventAlreadyExistsError();
        }
    }
}
