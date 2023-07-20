import { useEffect, useState } from 'react';
import { Observable } from 'rxjs';

export const useSubscriptionState = <T>(subscription: Observable<T>): T => {
    const [state, setState] = useState<T | null>(null);

    useEffect(() => {
        const subscription$ = subscription.subscribe(setState);

        return () => subscription$.unsubscribe();
    }, [subscription]);

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return state!;
};
