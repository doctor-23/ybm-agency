import { forwardRef } from "react"
import cn from "classnames";
import styles from "./header.module.scss";

const HeaderComponent = forwardRef<HTMLElement>((props, ref) => {
    return (
        <header className={styles.header} ref={ref}>
            <div className={cn("container", styles.container)}>
                Header
            </div>
        </header>
    )
});

HeaderComponent.displayName = "HeaderComponent";

export default HeaderComponent;