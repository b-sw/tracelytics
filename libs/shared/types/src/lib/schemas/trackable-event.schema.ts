import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TrackableEventDocument = HydratedDocument<TrackableEvent>;

@Schema()
export class TrackableEvent {
    @Prop({ unique: true })
    name: string;
}

export const TrackableEventSchema = SchemaFactory.createForClass(TrackableEvent);
