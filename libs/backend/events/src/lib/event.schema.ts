import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type EventDocument = HydratedDocument<Event>;

@Schema()
export class Event {
    @Prop()
    id: string;

    @Prop()
    name: string;

    @Prop()
    timestamp: string;
}

export const EventSchema = SchemaFactory.createForClass(Event);
