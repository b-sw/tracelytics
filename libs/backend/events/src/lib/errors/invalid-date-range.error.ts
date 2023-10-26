import { BadRequestException } from '@nestjs/common';

export class InvalidDateRangeError extends BadRequestException {
    public static readonly MESSAGE = 'Invalid date range';

    constructor() {
        super(InvalidDateRangeError.MESSAGE);
    }
}
