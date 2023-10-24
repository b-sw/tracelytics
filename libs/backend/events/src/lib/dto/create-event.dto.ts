import { ApiProperty } from '@nestjs/swagger';
import { IsDate, Length } from 'class-validator';

export class CreateEventDto {
    @ApiProperty()
    @Length(5, 30)
    name: string;

    @ApiProperty()
    @IsDate()
    timestamp: string;
}
