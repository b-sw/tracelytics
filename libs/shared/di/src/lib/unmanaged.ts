import { unmanaged } from 'inversify';

/**
 * @deprecated - It's just a wrapper for the inversify bug. There is a type mismatch that should not exist and the fix is not merged yet.
 * {@link https://github.com/inversify/InversifyJS/pull/1499}
 */
export function unmanagedWrapper() {
    return (target: object, propertyKey: string | symbol | undefined, index: number) => {
        return unmanaged()(target, propertyKey as any, index);
    };
}
