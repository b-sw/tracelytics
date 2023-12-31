import { ApiProperty } from '@nestjs/swagger';
import { Length } from 'class-validator';

export class EventParams {
    @ApiProperty({ type: String })
    @Length(11, 11)
    eventId: string;
}
