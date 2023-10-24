import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateEventDto } from './dto/create-event.dto';
import { Event } from './event.schema';
import { EventsService } from './events.service';

@ApiTags('events')
@Controller('')
export class EventsController {
    constructor(private readonly _eventsService: EventsService) {}

    @Get('events')
    @ApiOperation({ summary: 'Get all matches' })
    getAllEvents(): Promise<Event[]> {
        return this._eventsService.findAll();
    }

    @Post('events')
    @ApiOperation({ summary: 'Create event' })
    createEvent(@Body() dto: CreateEventDto): Promise<Event> {
        return this._eventsService.create(dto);
    }

    @Delete('events/:id')
    @ApiOperation({ summary: 'Delete event' })
    deleteEvent(id: string): Promise<void> {
        return this._eventsService.delete(id);
    }

    @Put('events/:id')
    @ApiOperation({ summary: 'Update event' })
    updateEvent(id: string, @Body() dto: CreateEventDto): Promise<Event> {
        return this._eventsService.update(id, dto);
    }
}
