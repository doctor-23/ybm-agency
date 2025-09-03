import { describe, it, expect } from 'vitest'
import React from 'react'
import { renderHook } from '@testing-library/react'
import { SliderProvider, useSlider } from './SliderContext'

const wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <SliderProvider>{children}</SliderProvider>
)

describe('SliderContext/useSlider', () => {
  it('возвращает массив элементов внутри провайдера', () => {
    const { result } = renderHook(() => useSlider(), { wrapper })
    expect(Array.isArray(result.current)).toBe(true)
    expect(result.current.length).toBeGreaterThan(0)
  })

  it('бросает ошибку вне провайдера', () => {
    expect(() => renderHook(() => useSlider())).toThrowError(/useSlider must be used within SliderProvider/)
  })
})
