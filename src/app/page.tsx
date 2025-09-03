/**
 * Главная страница приложения.
 *
 * Состав:
 * - Header, Main (c вычисляемой minHeight), Footer.
 * - Внутри main — провайдер данных слайдера и секция со слайдером.
 */
"use client"

import { useRef } from "react";
import { useMainHeight } from "@/hooks/useMainHeight";
import { SliderProvider } from "@/context/SliderContext";
import HeaderComponent from "@/ui/components/header/HeaderComponent";
import FooterComponent from "@/ui/components/footer/FooterComponent";
import FromSketchToScrewComponent from "@/ui/components/fromSketchToScrew/FromSketchToScrewComponent";

export default function Home() {
    // Рефы для вычисления высоты main так, чтобы footer был прижат к низу
    const headerRef = useRef<HTMLElement>(null)
    const footerRef = useRef<HTMLElement>(null)

    // Возвращает { minHeight } — используем напрямую как inline-style
    const { minHeight } = useMainHeight(headerRef, footerRef)

    return (
        <>
            <HeaderComponent ref={headerRef}/>
            <main style={{ minHeight }}>

                {/* Провайдер слайдов доступен всем вложенным компонентам */}
                <SliderProvider>
                    <FromSketchToScrewComponent />
                </SliderProvider>

            </main>
            <FooterComponent ref={footerRef}/>
        </>
    );
}
