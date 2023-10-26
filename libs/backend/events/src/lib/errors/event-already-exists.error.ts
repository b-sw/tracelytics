import { BadRequestException } from '@nestjs/common';

export class EventAlreadyExistsError extends BadRequestException {
    public static readonly MESSAGE = 'Event already exists';

    constructor() {
        super(EventAlreadyExistsError.MESSAGE);
    }
}
