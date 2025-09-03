/**
 * Хук вычисления минимальной высоты основного контейнера (<main>),
 * чтобы футер оставался прижатым к нижней части экрана.
 *
 * Особенности:
 * - Учитывает реальные высоты header и footer по ref.
 * - Пересчитывает высоту при ресайзе окна.
 * - Возвращает стиль вида { minHeight } для прямого применения.
 */
import { useState, useEffect } from "react";

/**
 * Хук для расчёта минимальной высоты основного контейнера (<main>), чтобы футер оставался у нижней границы экрана.
 *
 * Особенности:
 * - Учитывает реальные высоты хедера и футера по ref.
 * - Пересчитывает высоту при изменении размера окна.
 * - Возвращает объект стилей с полем minHeight для прямого применения.
 *
 * @param {React.RefObject<HTMLElement | null>} headerRef - Ссылка на элемент хедера.
 * @param {React.RefObject<HTMLElement | null>} footerRef - Ссылка на элемент футера.
 * @returns {{ minHeight: number }} Объект с полем minHeight — расчётная минимальная высота.
 */
export function useMainHeight(
    headerRef: React.RefObject<HTMLElement | null>,
    footerRef: React.RefObject<HTMLElement | null>
) {
    const [minHeight, setMinHeight] = useState<number>(0);

    useEffect(() => {
        const calc = () => {
            const headerH = headerRef.current?.offsetHeight || 0;
            const footerH = footerRef.current?.offsetHeight || 0;
            const viewportH = window.innerHeight || 0;
            setMinHeight(Math.max(0, viewportH - headerH - footerH));
        };

        calc();
        window.addEventListener('resize', calc);
        return () => window.removeEventListener('resize', calc);
    }, [headerRef, footerRef]);

    return { minHeight };
}
