import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateEventDto, DATE_FORMAT, PeriodEvent, RegisterEventDto, TrackableEvent } from '@tracelytics/shared/types';
import { uuid } from '@tracelytics/shared/utils';
import dayjs, { Dayjs } from 'dayjs';
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

    async getRegisteredEventsFromPeriod(startDate: Dayjs, endDate: Dayjs): Promise<PeriodEvent[]> {
        const rawEvents: { _id: string; dates: string[] }[] = await this.registeredEventModel.aggregate([
            {
                $match: {
                    timestamp: {
                        $gte: startDate.toISOString(),
                        $lte: endDate.toISOString(),
                    },
                },
            },
            {
                $group: {
                    _id: '$trackableEventId',
                    dates: {
                        $push: '$timestamp',
                    },
                },
            },
        ]);

        const events = rawEvents.map(({ _id, dates }) => {
            const counts = dates.reduce((acc, date) => {
                const dateStr = dayjs(date).format(DATE_FORMAT);
                acc[dateStr] = acc[dateStr] ? acc[dateStr] + 1 : 1;
                return acc;
            }, {} as Record<string, number>);

            return { id: _id, counts, totalCount: dates.length };
        });

        const trackableEvents = (await this.findAll()).reduce((acc, event) => {
            acc.set(event.id, event.name);
            return acc;
        }, new Map<string, string>());

        return events.map(event => ({ ...event, name: trackableEvents.get(event.id) as string }));
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
