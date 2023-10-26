import { BadRequestException } from '@nestjs/common';

export class EventNotFoundError extends BadRequestException {
    public static readonly MESSAGE = 'Event not found';

    constructor() {
        super(EventNotFoundError.MESSAGE);
    }
}
