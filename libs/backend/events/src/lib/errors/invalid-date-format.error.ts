import { BadRequestException } from '@nestjs/common';

export class InvalidDateFormatError extends BadRequestException {
    public static readonly MESSAGE = (invalidDate: string) => `Invalid date format: ${invalidDate}`;

    constructor(invalidDate: string) {
        super(InvalidDateFormatError.MESSAGE(invalidDate));
    }
}
