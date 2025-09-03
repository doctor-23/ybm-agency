import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import HeaderComponent from './HeaderComponent'

describe('HeaderComponent', () => {
  it('рендерит текст Header', () => {
    render(<HeaderComponent />)
    expect(screen.getByText('Header')).toBeInTheDocument()
  })
})
