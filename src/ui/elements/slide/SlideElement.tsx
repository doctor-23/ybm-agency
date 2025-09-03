/**
 * Карточка слайда внутри Swiper.
 *
 * Особенности и A11y:
 * - Важный контент отображается только на активном слайде (isActive).
 * - Фоновое изображение задаётся через CSS background; для скринридеров описание передаётся на уровне слайда (aria-label).
 */
import React from "react";
import TitleElement from "@/ui/elements/title/TitleElement";
import styles from "./slide.module.scss";
import cn from "classnames";

/**
 * Пропсы слайда
 */
interface ISlideProps {
    title: string;
    content: string;
    isActive: boolean;
    image?: string
    className?: string
}

/**
 * Презентационный компонент слайда.
 */
export const SlideElement: React.FC<ISlideProps> = ({
                                                        title,
                                                        content,
                                                        isActive,
                                                        image,
                                                        className
                                                    }) => {
    return (
        <div
            className={cn(styles.slide, className)}
            style={{backgroundImage: `url("${image}")`}}
        >
            {isActive && (
                <>
                    <TitleElement
                        type={'h3'}
                        text={title}
                        className={styles.title}
                    />

                    <p className={styles.description}>
                        {content}
                    </p>
                </>
            )}
        </div>
    );
};

export default SlideElement;
