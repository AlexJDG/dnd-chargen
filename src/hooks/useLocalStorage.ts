import { useCallback, useState } from "react";

const getInitialValue = <T extends string>(
    key: string,
    initialValue?: T,
): T | undefined => {
    try {
        const item = window.localStorage.getItem(key);
        return item ? (JSON.parse(item) as T) : initialValue;
    } catch (error) {
        console.error(error);
        return initialValue;
    }
};

export const useLocalStorage = <T extends string>(
    key: string,
    initialValue?: T,
): [T | undefined, (value: T) => void] => {
    const [storedValue, setStoredValue] = useState(
        getInitialValue(key, initialValue),
    );

    const setValue = useCallback(
        (value: T) => {
            try {
                setStoredValue(value);
                window.localStorage.setItem(key, JSON.stringify(value));
            } catch (error) {
                console.error(error);
            }
        },
        [key],
    );

    return [storedValue, setValue];
};
