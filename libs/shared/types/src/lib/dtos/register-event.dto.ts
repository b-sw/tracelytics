import { ApiProperty } from '@nestjs/swagger';
import { IsDate } from 'class-validator';

export class RegisterEventDto {
    @ApiProperty()
    @IsDate()
    timestamp: string;
}
