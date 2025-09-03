import '@testing-library/jest-dom'

// Дополнительные глобальные настройки для тестов можно разместить здесь
// Например, мок для next/navigation или window.matchMedia при необходимости.
if (!('matchMedia' in window)) {
  // @ts-expect-error расширяем window для тестов
  window.matchMedia = (query: string) => {
    return {
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {}, // deprecated
      removeListener: () => {}, // deprecated
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    } as unknown as MediaQueryList
  }
}
