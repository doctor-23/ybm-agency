import { describe, it, expect } from 'vitest'
import { clampValue } from '@/utils/clamp'

describe('clampValue', () => {
  it('возвращает val, если в диапазоне', () => {
    expect(clampValue(5, 0, 10)).toBe(5)
  })

  it('зажимает к min, если меньше минимума', () => {
    expect(clampValue(-3, 0, 10)).toBe(0)
  })

  it('зажимает к max, если больше максимума', () => {
    expect(clampValue(42, 0, 10)).toBe(10)
  })

  it('работает при min == max', () => {
    expect(clampValue(5, 7, 7)).toBe(7)
  })
})
