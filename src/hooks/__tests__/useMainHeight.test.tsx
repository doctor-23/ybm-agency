import { describe, it, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useMainHeight } from '@/hooks/useMainHeight'
import React from 'react'

function createEl(height: number): HTMLElement {
  const el = document.createElement('div')
  Object.defineProperty(el, 'offsetHeight', { value: height, configurable: true })
  return el
}

describe('useMainHeight', () => {
  it('вычисляет minHeight = viewport - header - footer и обновляется на resize', () => {
    const header = createEl(100)
    const footer = createEl(50)

    const headerRef = { current: header } as React.RefObject<HTMLElement>
    const footerRef = { current: footer } as React.RefObject<HTMLElement>

    const originalInnerHeight = window.innerHeight
    // @ts-expect-error переопределяем только для теста
    window.innerHeight = 800

    const { result } = renderHook(() => useMainHeight(headerRef, footerRef))

    expect(result.current.minHeight).toBe(800 - 100 - 50)

    act(() => {
      // @ts-expect-error тест
      window.innerHeight = 600
      window.dispatchEvent(new Event('resize'))
    })

    expect(result.current.minHeight).toBe(600 - 100 - 50)

    // возврат значения окна
    // @ts-expect-error тест
    window.innerHeight = originalInnerHeight
  })

  it('не опускается ниже 0', () => {
    const header = createEl(500)
    const footer = createEl(500)

    const headerRef = { current: header } as React.RefObject<HTMLElement>
    const footerRef = { current: footer } as React.RefObject<HTMLElement>

    const originalInnerHeight = window.innerHeight
    // @ts-expect-error тест
    window.innerHeight = 800

    const { result } = renderHook(() => useMainHeight(headerRef, footerRef))

    expect(result.current.minHeight).toBe(0)

    // @ts-expect-error тест
    window.innerHeight = originalInnerHeight
  })
})
