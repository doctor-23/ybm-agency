/**
 * Хук измерения ширины контейнера через Ref.
 *
 * Особенности:
 * - Предпочитает ResizeObserver при наличии; иначе слушает window.resize.
 * - Возвращает ref для привязки к контейнеру и текущее значение ширины.
 * - Дженерик позволяет типизировать целевой элемент (по умолчанию HTMLDivElement).
 */
import {useCallback, useEffect, useRef, useState} from "react";

type ReturnType<T extends HTMLElement> = {
    ref: React.MutableRefObject<T | null>;
    width: number;
}

/**
 * useContainerWidth
 * @returns {{ref: RefObject<T>, width: number}}
 */
export const useContainerWidth = <T extends HTMLElement>(): ReturnType<T> => {
    const ref = useRef<T | null>(null);
    const [width, setWidth] = useState(0);

    const update = useCallback(() => {
        const el = ref.current;
        if (!el) return;
        setWidth(el.clientWidth);
    }, []);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        let observer: ResizeObserver | null = null;

        if (typeof ResizeObserver !== 'undefined') {
            observer = new ResizeObserver(update);
            observer.observe(el);
        } else {
            window.addEventListener('resize', update);
        }

        update();

        return () => {
            if (observer) observer.disconnect();
            else window.removeEventListener('resize', update);
        };
    }, [update]);

    return {ref, width};
};
