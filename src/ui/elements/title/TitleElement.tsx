/**
 * Заголовок с поддержкой безопасной вставки HTML (line-break и т.п.).
 *
 * Особенности:
 * - Поддерживает типы заголовков h1..h6.
 * - При передаче строки с HTML-тегами допускает только <br> и <span> (через DOMPurify).
 * - При рендере обычного текста или ReactNode санитизация не выполняется.
 */
"use client";

import React, { useMemo } from "react"
import cn from "classnames";
import createDOMPurify  from 'dompurify';
import styles from "./title.module.scss";

/**
 * Типы заголовков.
 */
type titleType = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

/**
 * Пропсы TitleElement.
 *
 * @property {titleType} type - Тип заголовка.
 * @property {string | React.ReactNode} text - Текст заголовка.
 * @property {string} [className] - Дополнительный класс.
 */
interface IProps {
    type: titleType;
    text: string | React.ReactNode;
    className?: string;
}

/**
 * Компонент заголовка с опциональной безопасной вставкой HTML.
 *
 * @param {IProps} props - Пропсы компонента.
 * @returns {JSX.Element} Компонент заголовка.
 */
const TitleElement = ({ type, text, className }: IProps) => {
    const Tag = type;

    // Создаем экземпляр DOMPurify для санитизации HTML.
    const purifier = useMemo(() => {
        if (typeof window === "undefined") return null;
        return createDOMPurify(window);
    }, []);

    // Проверяем, является ли текст строкой.
    const isString = typeof text === "string";
    // Проверяем, содержит ли строка HTML-теги.
    const isHTMLString = isString && /<\/?[a-z][\s\S]*>/i.test(text);

    let content: React.ReactNode;

    if (isHTMLString) {
        // Разрешаем только перенос строки и span — исключаем небезопасные теги.
        content = (
            <span
                dangerouslySetInnerHTML={{
                    __html: purifier
                        ? purifier.sanitize(text as string, { ALLOWED_TAGS: ["br", "span"] })
                        : (text as string),
                }}
            />
        );
    } else {
        // Если текст не содержит HTML-тегов, рендерим его как есть.
        content = text; // обычная строка или ReactNode
    }

    return (
        <Tag className={cn(styles.title, className)}>
            {content}
        </Tag>
    );
};

export default TitleElement;