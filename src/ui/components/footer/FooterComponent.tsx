"use client"

import { forwardRef } from "react";
import cn from "classnames";
import styles from "./footer.module.scss";

const FooterComponent = forwardRef<HTMLElement>((props, ref) => {
    return (
        <footer className={styles.footer} ref={ref}>
            <div className={cn("container", styles.container)}>
                Footer
            </div>
        </footer>
    )
});

FooterComponent.displayName = "FooterComponent";

export default FooterComponent;