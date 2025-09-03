import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { SliderProvider } from '@/context/SliderContext'
import FromSketchToScrewComponent from './FromSketchToScrewComponent'

// Мокаем тяжёлый SliderComponent (Swiper) простым дивом
vi.mock('@/ui/components/slider/SliderComponent', () => ({
  default: ({ className }: { className?: string }) => (
    <div role="region" aria-label="Слайдер шагов (mock)" className={className} />
  ),
}))

const wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <SliderProvider>{children}</SliderProvider>
)

describe('FromSketchToScrewComponent', () => {
  beforeEach(() => {
    // мок alert
    // @ts-expect-error расширение window для теста
    window.alert = vi.fn()
  })

  it('рендерит секцию с aria-label и заголовок h1', () => {
    render(<FromSketchToScrewComponent />, { wrapper })

    const region = screen.getByRole('region', {
      name: 'План от первого эскиза до финального шага',
    })
    expect(region).toBeInTheDocument()

    const h1 = screen.getByRole('heading', { level: 1 })
    expect(h1).toBeInTheDocument()
    const normalized = h1.textContent?.replace(/\s+/g, ' ').trim()
    expect(normalized).toContain('From First Sketch to Final Screw — Here\'s the Plan')

    // Слайдер замокан
    expect(screen.getByRole('region', { name: 'Слайдер шагов (mock)' })).toBeInTheDocument()
  })

  it('рендерит кнопку CTA и вызывает alert по клику', () => {
    render(<FromSketchToScrewComponent />, { wrapper })

    const btn = screen.getByRole('button', { name: 'Start Your Project Today!' })
    fireEvent.click(btn)
    expect(window.alert).toHaveBeenCalled()
  })
})
