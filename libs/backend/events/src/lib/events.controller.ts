import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateEventDto, RegisterEventDto, TrackableEvent } from '@tracelytics/shared/types';
import { EventsService } from './events.service';
import { EventParams } from './params/event.params';

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

    @Post(`${EventsController.API_TAG}/:eventName`)
    @ApiOperation({ summary: 'Register event' })
    registerEvent(@Param() { name }: EventParams, @Body() dto: RegisterEventDto): Promise<TrackableEvent> {
        return this._eventsService.register(name, dto);
    }

    @Delete(`${EventsController.API_TAG}/:eventName`)
    @ApiOperation({ summary: 'Delete event' })
    deleteEvent(@Param() { name }: EventParams): Promise<void> {
        return this._eventsService.delete(name);
    }

    @Put(`${EventsController.API_TAG}/:eventName`)
    @ApiOperation({ summary: 'Update event' })
    updateEvent(@Param() { name }: EventParams, @Body() dto: CreateEventDto): Promise<TrackableEvent> {
        return this._eventsService.update(name, dto);
    }
}
