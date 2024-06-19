import { useEffect, useState } from 'react';

export default function useDebounce(q: string) {
    const [debounce, setDebounce] = useState<string>('');

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebounce(q);
        }, 300);

        return () => {
            clearTimeout(timer);
        };
    }, [q]);

    return debounce;
}
