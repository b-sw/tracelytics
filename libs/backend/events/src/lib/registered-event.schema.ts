import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type RegisteredEventDocument = HydratedDocument<RegisteredEvent>;

@Schema()
export class RegisteredEvent {
    @Prop()
    trackableEventId: string;

    @Prop()
    timestamp: string;
}

export const RegisteredEventSchema = SchemaFactory.createForClass(RegisteredEvent);
