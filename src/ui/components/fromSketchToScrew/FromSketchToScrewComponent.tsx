/**
 * Секция "From First Sketch to Final Screw" — демонстрирует план проекта с помощью слайдера шагов.
 *
 * A11y:
 * - Секция имеет role="region" и aria-label для анонса скринридерами.
 * - Заголовок использует безопасную HTML-вставку для переноса строки.
 */
import cn from "classnames";
import SliderComponent from "@/ui/components/slider/SliderComponent";
import TitleElement from "@/ui/elements/title/TitleElement";
import ButtonElement from "@/ui/elements/button/ButtonElement";
import styles from "./fromSketchToScrew.module.scss";

/**
 * Простой композиционный компонент секции.
 */
const FromSketchToScrewComponent = () => {
    return (
        <section
            className={styles.section}
            role="region"
            aria-label="План от первого эскиза до финального шага"
        >
            <div className={cn("container", styles.container)}>
                <TitleElement
                    type={'h1'}
                    text={"From First Sketch to Final <br/> Screw — Here's the Plan"}
                    className={styles.title}
                />

                <SliderComponent className={styles.slider} />

                <p className={styles.ctaText}>
                    You&apos;re just one step way from stating — let&apos;s talk
                </p>

                <ButtonElement
                    className={styles.button}
                    primary={true}
                    onClick={() => alert("Let\'s roll")}
                >
                    Start Your Project Today!
                </ButtonElement>
            </div>
        </section>
    )
}

export default FromSketchToScrewComponent;