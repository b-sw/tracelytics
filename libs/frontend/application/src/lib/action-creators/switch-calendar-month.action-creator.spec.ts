import { CalendarState } from '@tracelytics/frontend/application';
import { SwitchDirection } from '@tracelytics/frontend/domain';
import { createTestingModule } from '@tracelytics/shared/di';
import { Dispatcher } from '@tracelytics/shared/flux';
import { ChangeCalendarDaysAction, ChangeCalendarMonthAction, ChangeCalendarSwitchDirectionAction } from '../actions';
import { SwitchCalendarMonthActionCreator } from './switch-calendar-month.action-creator';

describe('SwitchCalendarMonthActionCreator', () => {
    it('creates action', () => {
        const testingModule = createTestingModule({
            providers: [SwitchCalendarMonthActionCreator, Dispatcher, CalendarState],
        });
        const actionCreator = testingModule.get(SwitchCalendarMonthActionCreator);
        const dispatcher = testingModule.get(Dispatcher);
        jest.spyOn(dispatcher, 'emit');

        actionCreator.create(SwitchDirection.Right);

        expect(dispatcher.emit).toHaveBeenCalledTimes(3);
        expect(dispatcher.emit).toHaveBeenNthCalledWith(1, expect.any(ChangeCalendarSwitchDirectionAction));
        expect(dispatcher.emit).toHaveBeenNthCalledWith(2, expect.any(ChangeCalendarMonthAction));
        expect(dispatcher.emit).toHaveBeenNthCalledWith(3, expect.any(ChangeCalendarDaysAction));
    });
});
