import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import ButtonElement from './ButtonElement'

describe('ButtonElement', () => {
  it('отрисовывает children и вызывает onClick', () => {
    const onClick = vi.fn()
    render(<ButtonElement onClick={onClick}>Click me</ButtonElement>)
    const btn = screen.getByRole('button', { name: 'Click me' })
    fireEvent.click(btn)
    expect(onClick).toHaveBeenCalled()
  })

  it('устанавливает aria-disabled и disabled', () => {
    render(<ButtonElement disabled>Disabled</ButtonElement>)
    const btn = screen.getByRole('button', { name: 'Disabled' })
    expect(btn).toBeDisabled()
    expect(btn).toHaveAttribute('aria-disabled', 'true')
  })
})
