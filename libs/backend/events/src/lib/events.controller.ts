import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateEventDto, RegisterEventDto, TrackableEvent } from '@tracelytics/shared/types';
import { EventsService } from './events.service';
import { EventParams } from './params/event.params';
import { RegisteredEvent } from './registered-event.schema';

@ApiTags(EventsController.API_TAG)
@Controller('')
export class EventsController {
    public static readonly API_TAG = 'events';

    constructor(private readonly _eventsService: EventsService) {}

    @Get(`${EventsController.API_TAG}`)
    @ApiOperation({ summary: 'Get all events' })
    getAllEvents(): Promise<TrackableEvent[]> {
        return this._eventsService.findAll();
    }

    @Post(`${EventsController.API_TAG}`)
    @ApiOperation({ summary: 'Create event' })
    createEvent(@Body() dto: CreateEventDto): Promise<TrackableEvent> {
        return this._eventsService.create(dto);
    }

    @Post(`${EventsController.API_TAG}/:eventId`)
    @ApiOperation({ summary: 'Register event' })
    registerEvent(@Param() { eventId }: EventParams, @Body() dto: RegisterEventDto): Promise<RegisteredEvent> {
        return this._eventsService.register(eventId, dto);
    }

    @Delete(`${EventsController.API_TAG}/:eventId`)
    @ApiOperation({ summary: 'Delete event' })
    deleteEvent(@Param() { eventId }: EventParams): Promise<void> {
        return this._eventsService.delete(eventId);
    }

    @Put(`${EventsController.API_TAG}/:eventId`)
    @ApiOperation({ summary: 'Update event' })
    updateEvent(@Param() { eventId }: EventParams, @Body() dto: CreateEventDto): Promise<TrackableEvent> {
        return this._eventsService.update(eventId, dto);
    }
}
