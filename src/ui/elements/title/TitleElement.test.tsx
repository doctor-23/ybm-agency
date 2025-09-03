import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import TitleElement from './TitleElement'

describe('TitleElement', () => {
  it('рендерит простой текст в нужном теге', () => {
    render(<TitleElement type="h2" text="Hello" />)
    const h = screen.getByRole('heading', { level: 2, name: 'Hello' })
    expect(h).toBeInTheDocument()
  })

  it('разрешает только <br> и <span> в HTML-строке и санитизирует остальное', () => {
    render(<TitleElement type="h3" text={'Hi<br><span>there</span><script>alert(1)</script>'} />)
    const h = screen.getByRole('heading', { level: 3 })
    expect(h.innerHTML).toContain('<br>')
    expect(h.innerHTML).toContain('<span>there</span>')
    expect(h.innerHTML).not.toContain('<script>')
  })
})
