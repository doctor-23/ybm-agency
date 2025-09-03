/**
 * Хук синхронизации состояния React-слайдера со Swiper.
 *
 * Делает следующее при изменении зависимостей:
 * - Обновляет размеры и классы свайпера (updateSize, updateSlides, update, updateSlidesClasses).
 * - Вычисляет и прокручивает окно видимых слайдов так, чтобы активный индекс был в фокусе окна.
 *
 * @param swiper        Экземпляр Swiper (или null до инициализации)
 * @param slideWidths   Массив ширин слайдов (строка с единицами измерения)
 * @param activeIndex   Текущий активный индекс
 * @param visibleCount  Количество видимых слайдов в окне
 * @param itemsLength   Общее число слайдов
 */
import { useEffect } from 'react';
import { clampValue } from '@/utils/clamp';
import type { Swiper as SwiperInstance } from 'swiper';

export const useSwiperSync = (
    swiper: SwiperInstance | null,
    slideWidths: string[],
    activeIndex: number,
    visibleCount: number,
    itemsLength: number
) => {
    useEffect(() => {
        if (!swiper) return;

        requestAnimationFrame(() => {
            swiper.updateSize?.();
            swiper.updateSlides?.();
            swiper.update?.();
            swiper.updateSlidesClasses?.();

            const maxStart = Math.max(0, itemsLength - visibleCount);
            const nextWindowStart = clampValue(activeIndex - 1, 0, maxStart);
            swiper.slideTo(nextWindowStart, 0, false);
        });
    }, [slideWidths, swiper, activeIndex, visibleCount, itemsLength]);
};
