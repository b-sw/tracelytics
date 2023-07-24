import { State } from './state';

describe('state', () => {
    type PropsStub = {
        foo: string;
        bar: number;
    };
    const defaultStateStub: PropsStub = {
        foo: 'foo',
        bar: 1,
    };

    it('creates a state with props', () => {
        const state = new State<PropsStub>(defaultStateStub);

        expect(state.foo).toEqual(defaultStateStub.foo);
        expect(state.bar).toEqual(defaultStateStub.bar);
    });

    it('creates a state with observable props', () => {
        const state = new State<PropsStub>(defaultStateStub);
        const fooSpy = jest.fn();
        const barSpy = jest.fn();

        state.foo$.subscribe(fooSpy);
        state.bar$.subscribe(barSpy);

        expect(fooSpy).toHaveBeenCalledWith(defaultStateStub.foo);
        expect(barSpy).toHaveBeenCalledWith(defaultStateStub.bar);
    });
});
