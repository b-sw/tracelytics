import { BehaviorSubject, map, Observable } from 'rxjs';

type StateProps = {
    [key: string]: unknown;
};

class State<T extends StateProps> {
    #props$: BehaviorSubject<T>;

    constructor(defaultState: T) {
        this.#props$ = new BehaviorSubject<T>(defaultState);
        const props = Object.keys(defaultState);

        props.forEach((prop) => {
            this._definePropGetter(prop);
            this._definePropObservableGetter(prop);
        });
    }

    private _definePropGetter(prop: string): void {
        Object.defineProperty(this, prop, {
            get: () => this.#props$.getValue()[prop],
        });
    }

    private _definePropObservableGetter(prop: string): void {
        Object.defineProperty(this, `${prop}$`, {
            get: () => this.#props$.asObservable().pipe(map((state) => state[prop])),
        });
    }
}

type ObservableProps<T extends StateProps> = {
    [K in keyof T as `${string & K}$`]: Observable<T[K]>;
};

const TypedStated = State as new <T extends StateProps>(defaultState: T) => T & ObservableProps<T>;

export { TypedStated as State };
