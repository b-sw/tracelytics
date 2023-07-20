import { StatesModule } from '@tracelytics/frontend/states';
import { Module } from '@tracelytics/shared/di';

@Module({
    imports: [StatesModule],
})
export class RootModule {}
