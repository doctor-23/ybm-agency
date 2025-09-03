/**
 * Слайдер шагов процесса.
 *
 * Особенности:
 * - Десктоп: управляется состоянием activeIndex. Колесо мыши (Mousewheel) и клавиатура (кастомная логика).
 * - Мобильный: эффект "cards" без кастомной клавиатуры (жесты касания).
 * - A11y: контейнер имеет role="region" и aria-activedescendant; слайды имеют role="group" и aria-метки.
 * - Синхронизация слайдера и ширин карточек выполняется хуком useSwiperSync.
 */
import React, {useState, useMemo} from 'react';
import {useMediaQuery} from "react-responsive";
import {useSlider} from "@/context/SliderContext";
import {useSwiperSync} from '@/hooks/useSwiperSync';
import {useContainerWidth} from '@/hooks/useContainerWidth';
import {calcSlideWidths} from '@/utils/layoutSlider';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Mousewheel, EffectCards} from 'swiper/modules';
import { clampValue } from '@/utils/clamp';
import cn from "classnames";
import SlideElement from "@/ui/elements/slide/SlideElement";
import styles from "./slider.module.scss";
import "swiper/css";
import "swiper/css/effect-cards";
import type { Swiper as SwiperInstance } from 'swiper';

/**
 * Пропсы SliderComponent
 */
export const SliderComponent: React.FC<{ className?: string }> = ({className}) => {
    const sliderItems = useSlider();

    const {ref: containerRef, width: containerWidth} = useContainerWidth<HTMLDivElement>();
    const [activeIndex, setActiveIndex] = useState(0);
    const [swiper, setSwiper] = useState<SwiperInstance | null>(null);

    const isTablet = useMediaQuery({maxWidth: 819});
    const isMobile = useMediaQuery({maxWidth: 575});
    const GAP = isTablet ? 15 : 20;

    const visibleCount = Math.min(sliderItems.length, 3);
    const slideWidths = calcSlideWidths(sliderItems.length, activeIndex, containerWidth, GAP, visibleCount);

    useSwiperSync(swiper, slideWidths, activeIndex, visibleCount, sliderItems.length);

    /**
     * Конфигурация Swiper:
     * - Мобильный режим: эффект "cards" (тач-жесты), без Mousewheel.
     * - Десктоп: авто-ширины, управляем колесом мыши; тач отключён.
     */
    const swiperOptions = useMemo(() => {
        return isMobile
            ? {
                modules: [EffectCards],
                effect: "cards" as const,
                grabCursor: true,
                slidesPerView: 1,
                className: styles.slider,
            }
            : {
                modules: [Mousewheel],
                slidesPerView: "auto" as const,
                spaceBetween: GAP,
                allowTouchMove: false,
                observer: true,
                observeParents: true,
                watchSlidesProgress: true,
                grabCursor: false,
                onSwiper: setSwiper,
                className: styles.slider,
            };
    }, [isMobile, GAP]);

    /**
     * Клавиатурная навигация (десктоп):
     * - ArrowRight/ArrowLeft: переключение на соседние слайды
     * - Home/End: переход к первому/последнему слайду
     * - Enter/Space на слайде: активирует/фокусирует выбранный слайд
     */
    const handleKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
        if (isMobile) return; // на мобилке свайп жестами
        let next = activeIndex;
        if (e.key === 'ArrowRight') next = clampValue(activeIndex + 1, 0, sliderItems.length - 1);
        else if (e.key === 'ArrowLeft') next = clampValue(activeIndex - 1, 0, sliderItems.length - 1);
        else if (e.key === 'Home') next = 0;
        else if (e.key === 'End') next = sliderItems.length - 1;
        else return;
        e.preventDefault();
        setActiveIndex(next);
    };

    return (
        <div
            ref={containerRef}
            className={cn(className, styles.wrapper)}
            role="region"
            aria-label="Слайдер шагов"
            tabIndex={0}
            onKeyDown={handleKeyDown}
        >
            <Swiper key={isMobile ? "mobile" : "desktop"} {...swiperOptions}>

                {sliderItems.map((item, i) => (
                    isMobile ? (
                        <SwiperSlide
                            key={i}
                            className={styles.slide}
                            role="group"
                            aria-roledescription="слайд"
                            aria-label={`Шаг ${i + 1} из ${sliderItems.length}: ${item.title}`}
                            tabIndex={0}
                            id={`slide-${i}`}
                        >
                            <SlideElement
                                title={item.title}
                                content={item.content}
                                image={item.image}
                                isActive={true}
                                className={styles.slideContent}
                            />
                        </SwiperSlide>
                    ) : (
                        <SwiperSlide
                            key={i}
                            className={styles.slide}
                            style={{width: slideWidths[i]}}
                            onClick={() => setActiveIndex(i)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    e.preventDefault();
                                    setActiveIndex(i);
                                }
                            }}
                            role="group"
                            aria-roledescription="слайд"
                            aria-label={`Шаг ${i + 1} из ${sliderItems.length}: ${item.title}`}
                            aria-hidden={i !== activeIndex}
                            tabIndex={i === activeIndex ? 0 : -1}
                            id={`slide-${i}`}
                        >
                            <SlideElement
                                title={item.title}
                                content={item.content}
                                image={item.image}
                                isActive={i === activeIndex}
                                className={styles.slideContent}
                            />
                        </SwiperSlide>
                    )
                ))}

            </Swiper>

        </div>
    );
};

export default SliderComponent;
