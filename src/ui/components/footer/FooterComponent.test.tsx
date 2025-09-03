import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import FooterComponent from './FooterComponent'

describe('FooterComponent', () => {
  it('рендерит текст Footer', () => {
    render(<FooterComponent />)
    expect(screen.getByText('Footer')).toBeInTheDocument()
  })
})
