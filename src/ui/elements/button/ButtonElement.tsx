/**
 * Универсальная кнопка проекта.
 *
 * Особенности:
 * - Поддерживает варианты: primary/secondary.
 * - Состояние disabled блокирует взаимодействие и помечается aria-disabled для a11y.
 */
import React from "react";
import cn from "classnames";
import styles from "./button.module.scss";

/**
 * Пропсы ButtonElement
 */
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    primary?: boolean;
    disabled?: boolean;
    type?: "button" | "submit" | "reset";
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    className?: string
}

/**
 * Компонент кнопки с вариативными стилями и доступностью.
 */
export const ButtonElement = ({
                                  children,
                                  primary = true,
                                  disabled = false,
                                  type = "button",
                                  onClick,
                                  className,
                              }: ButtonProps) => {
    return (
        <button
            className={cn(
                styles.button,
                className,
                {
                    [styles.disabled]: disabled,
                    [styles.primary]: primary,
                    [styles.secondary]: !primary
                }
            )}
            type={type || "button"}
            onClick={onClick}
            disabled={disabled}
            aria-disabled={disabled}
        >
            {children}
        </button>
    );
};

export default ButtonElement;