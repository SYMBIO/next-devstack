import { useCallback, useEffect, useState } from 'react';
import { ASYNC_STATES } from '../../lib/constants';

export const useAsync = <T, E = string>(asyncFunction: () => Promise<T>, immediate = true) => {
    const [status, setStatus] = useState<ASYNC_STATES>(ASYNC_STATES.IDLE);
    const [value, setValue] = useState<T | null>(null);
    const [error, setError] = useState<E | null>(null);

    // The execute function wraps asyncFunction and
    // handles setting state for pending, value, and error.
    // useCallback ensures the below useEffect is not called
    // on every render, but only if asyncFunction changes.
    const execute = useCallback(() => {
        setStatus(ASYNC_STATES.PENDING);
        setValue(null);
        setError(null);

        return asyncFunction()
            .then((response: any) => {
                setValue(response);
                setStatus(ASYNC_STATES.SUCCESS);
            })
            .catch((error: any) => {
                setError(error);
                setStatus(ASYNC_STATES.ERROR);
            });
    }, [asyncFunction]);

    // Call execute if we want to fire it right away.
    // Otherwise execute can be called later, such as
    // in an onClick handler.
    useEffect(() => {
        if (immediate) {
            execute();
        }
    }, [execute, immediate]);

    return { execute, status, value, error };
};
