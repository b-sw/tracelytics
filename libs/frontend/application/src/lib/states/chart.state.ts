import { ChartStateModel } from '@tracelytics/frontend/domain';
import { TrackableEvent } from '@tracelytics/shared/types';
import { injectable } from 'inversify';
import { State } from '.';

@injectable()
export class ChartState extends State<ChartStateModel> {
    static readonly DEFAULT_STATE = {
        eventColors: new Map<TrackableEvent['id'], string>(),
    };

    constructor() {
        super(ChartState.DEFAULT_STATE);
    }

    initialiseEventColors(events: TrackableEvent[]) {
        const eventColors = new Map<TrackableEvent['id'], string>();

        events.forEach(event => eventColors.set(event.id, this._getRandomColor()));
        this.setPartialState({ eventColors });
    }

    private _getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';

        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }

        return color;
    }
}
