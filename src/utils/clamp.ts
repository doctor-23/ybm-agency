/**
 * Ограничивает число диапазоном [min, max].
 *
 * @param {number} val - исходное значение
 * @param {number} min - нижняя граница
 * @param {number} max - верхняя граница
 * @returns {number} ограниченное значение
 */
export const clampValue = (
  val: number,
  min: number,
  max: number
): number => {
  const clampedMin = Math.max(min, val);
  return Math.min(max, clampedMin);
};