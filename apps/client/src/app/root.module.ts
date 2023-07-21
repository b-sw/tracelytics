import { ApplicationModule } from '@tracelytics/frontend/application';
import { Module } from '@tracelytics/shared/di';
import { FluxModule } from '@tracelytics/shared/flux';

@Module({
    imports: [FluxModule, ApplicationModule],
})
export class RootModule {}
