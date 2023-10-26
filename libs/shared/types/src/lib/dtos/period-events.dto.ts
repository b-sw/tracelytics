import { ApiProperty } from '@nestjs/swagger';

export class PeriodEventsDto {
    @ApiProperty()
    periodStart: string;

    @ApiProperty()
    periodEnd: string;
}
