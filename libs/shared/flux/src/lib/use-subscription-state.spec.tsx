import '@testing-library/jest-dom';
import { act, render, screen } from '@testing-library/react';
import * as React from 'react';
import { BehaviorSubject, Subject } from 'rxjs';
import { useSubscriptionState } from './use-subscription-state';

describe('useSubscriptionState', () => {
    const renderStubId = 'render-stub';
    const initialValueStub = 0;
    const changedValueStub = 1;
    const observableStub$ = new BehaviorSubject(initialValueStub);
    const TestComponent = () => {
        const value = useSubscriptionState(observableStub$, -1);

        return <div data-testid={renderStubId}>{value}</div>;
    };

    it('should use value on init', () => {
        render(<TestComponent />);

        expect(screen.getByTestId(renderStubId).textContent).toEqual(`${initialValueStub}`);
    });

    it('should use changed value', () => {
        render(<TestComponent />);

        act(() => {
            observableStub$.next(changedValueStub);
        });

        expect(screen.getByTestId(renderStubId).textContent).toEqual(`${changedValueStub}`);
    });

    it('should use initial value when not piped', () => {
        const observableStub$ = new Subject<number>();
        const initialValueStub = -1;
        const TestComponent = () => {
            const value = useSubscriptionState(observableStub$, initialValueStub);

            return <div data-testid={renderStubId}>{value}</div>;
        };

        render(<TestComponent />);

        expect(screen.getByTestId(renderStubId).textContent).toEqual(`${initialValueStub}`);
    });
});
