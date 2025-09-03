import { test, expect } from '@playwright/test'

test('главная: секция, заголовок, слайдер, клавиатура и alert', async ({ page }) => {
  await page.goto('/')

  // Header виден
  await expect(page.locator('header')).toBeVisible()
  await expect(page.getByText('Header')).toBeVisible()

  // Секция с aria-label
  const region = page.getByRole('region', { name: 'План от первого эскиза до финального шага' })
  await expect(region).toBeVisible()

  // Заголовок h1 (устойчив к переносам строк и типографике)
  const h1 = page.getByRole('heading', { level: 1 })
  await expect(h1).toBeVisible()
  await expect(h1).toContainText(/From First Sketch to Final/i)

  // Слайдер есть
  await expect(page.getByRole('region', { name: 'Слайдер шагов' })).toBeVisible()

  // (опционально) Проверка фокуса по клавиатуре
  const slider = page.getByRole('region', { name: 'Слайдер шагов' })
  await slider.focus()

  // Кнопка CTA открывает alert — мокируем alert и проверяем сообщение
  await page.evaluate(() => {
    // @ts-expect-error присваиваем глобально для проверки
    (window as unknown as { __alertMessage: string | null }).__alertMessage = null
    window.alert = (msg?: unknown) => {
      // @ts-expect-error сохраняем текст
      ;(window as unknown as { __alertMessage: string | null }).__alertMessage = String(
        (msg as string | number | boolean | null | undefined) ?? ''
      )
    }
  })
  await page.getByRole('button', { name: 'Start Your Project Today!' }).click()
  await expect(async () => {
    const txt = await page.evaluate<string | null>(
      () => (window as unknown as { __alertMessage: string | null }).__alertMessage
    )
    expect(txt).toMatch(/Let\'s roll/i)
  }).toPass()
})
