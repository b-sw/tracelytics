import {
    CalendarState,
    ChangeCalendarSelectedDateRangeAction,
    SelectCalendarDayActionCreator,
} from '@tracelytics/frontend/application';
import { createTestingModule } from '@tracelytics/shared/di';
import { Dispatcher } from '@tracelytics/shared/flux';
import dayjs from 'dayjs';

describe('SelectCalendarDayActionCreator', () => {
    const startDayStub = dayjs().startOf('day');
    const endDayStub = startDayStub.add(1, 'day').endOf('day');

    let actionCreator: SelectCalendarDayActionCreator;
    let dispatcher: Dispatcher;

    beforeEach(() => {
        const testingModule = createTestingModule({
            providers: [SelectCalendarDayActionCreator, Dispatcher, CalendarState],
        });

        actionCreator = testingModule.get(SelectCalendarDayActionCreator);
        dispatcher = testingModule.get(Dispatcher);
    });

    it('selects start day', () => {
        jest.spyOn(dispatcher, 'emit');

        actionCreator.create({ start: startDayStub, end: null });

        expect(dispatcher.emit).toHaveBeenCalledTimes(1);
        expect(dispatcher.emit).toHaveBeenCalledWith(
            new ChangeCalendarSelectedDateRangeAction({
                newDateRange: {
                    start: startDayStub,
                    end: null,
                },
            }),
        );
    });

    it('selects end day', () => {
        jest.spyOn(dispatcher, 'emit');

        actionCreator.create({ start: startDayStub, end: null });
        actionCreator.create({ start: null, end: endDayStub });

        expect(dispatcher.emit).toHaveBeenCalledTimes(2);
        expect(dispatcher.emit).toHaveBeenNthCalledWith(
            2,
            new ChangeCalendarSelectedDateRangeAction({
                newDateRange: {
                    start: startDayStub,
                    end: endDayStub,
                },
            }),
        );
    });
});
