/**
 * Вычисляет ширины слайдов для кастомного layout на десктопе.
 *
 * Идея: активный слайд занимает ~60% доступной ширины, остальные видимые — по ~20%.
 * При неизвестной ширине контейнера (0) — возвращаем проценты или 60/20 как фоллбек.
 *
 * @param {number} itemsLength   Общее число слайдов
 * @param {number} activeIndex   Индекс активного слайда
 * @param {number} containerWidth Ширина контейнера в пикселях
 * @param {number} gap           Межслайдовый отступ в пикселях
 * @param {number} visibleCount  Количество видимых слайдов
 * @returns {string[]} Массив ширин (px или %), длина равна itemsLength
 */
export const calcSlideWidths = (
    itemsLength: number,
    activeIndex: number,
    containerWidth: number,
    gap: number,
    visibleCount: number
): string[] => {
    if (!containerWidth || containerWidth <= 0) {
        return itemsLength <= 3
            ? Array(itemsLength).fill(`${100 / itemsLength}%`)
            : Array(itemsLength)
                .fill(null)
                .map((_, i) => (i === activeIndex ? '60%' : '20%'));
    }

    const totalGaps = Math.max(0, visibleCount - 1) * gap;
    const available = Math.max(0, containerWidth - totalGaps);

    return Array(itemsLength)
        .fill(null)
        .map((_, i) =>
            i === activeIndex
                ? `${Math.round(available * 0.6)}px`
                : `${Math.round(available * 0.2)}px`
        );
};