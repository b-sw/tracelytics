import { Module } from '@tracelytics/shared/di';
import { Dispatcher } from './lib/dispatcher';

@Module({
    providers: [Dispatcher],
})
export class FluxModule {}
