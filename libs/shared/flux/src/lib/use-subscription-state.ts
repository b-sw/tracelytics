import { useEffect, useState } from 'react';
import { Observable } from 'rxjs';

export const useSubscriptionState = <T>(subscription: Observable<T>, initialValue: T): T => {
    const [state, setState] = useState<T>(initialValue);

    useEffect(() => {
        const subscription$ = subscription.subscribe(setState);

        return () => subscription$.unsubscribe();
    }, [subscription]);

    return state;
};
