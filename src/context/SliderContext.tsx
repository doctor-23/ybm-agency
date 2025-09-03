/**
 * Контекст слайдера: предоставляет массив элементов слайдов всему приложению.
 *
 * Использование:
 * - Обернуть потребителей в <SliderProvider>.
 * - Получить данные через хук useSlider().
 */
import React, { createContext, useContext } from "react";
import { sliderItems, ISlideItem } from "@/data/sliderItems";

const SliderContext = createContext<ISlideItem[] | undefined>(undefined);

/**
 * Провайдер данных слайдера.
 */
export const SliderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <SliderContext.Provider value={sliderItems}>
        {children}
    </SliderContext.Provider>
);

/**
 * Хук доступа к данным слайдера.
 * @throws Error если используется вне SliderProvider.
 */
export const useSlider = () => {
    const context = useContext(SliderContext);
    if (!context) throw new Error("useSlider must be used within SliderProvider");
    return context;
};
