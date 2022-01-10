import { useEffect, RefObject } from 'react';

export default function useOutsideMouseClickAlerter(
    ref: RefObject<HTMLElement>,
    onOutsideClick: (event?: Event) => void,
) {
    useEffect(() => {
        function handleClickOutside(event: Event) {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                return onOutsideClick(event);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [ref]);
}
