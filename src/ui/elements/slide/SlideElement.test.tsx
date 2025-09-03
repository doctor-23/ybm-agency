import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import SlideElement from './SlideElement'

describe('SlideElement', () => {
  it('рендерит заголовок и описание только когда isActive=true', () => {
    const title = 'Step title'
    const content = 'Step content'

    const { rerender } = render(
      <SlideElement title={title} content={content} isActive={false} image="/img.jpg" />
    )

    expect(screen.queryByText(title)).toBeNull()
    expect(screen.queryByText(content)).toBeNull()

    rerender(
      <SlideElement title={title} content={content} isActive={true} image="/img.jpg" />
    )

    expect(screen.getByText(title)).toBeInTheDocument()
    expect(screen.getByText(content)).toBeInTheDocument()
  })
})
