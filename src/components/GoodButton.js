"use client";

import styles from "./GoodButton.module.css";
import clsx from "clsx";

export default function Button({ variant = "primary", className, ...props }) {
	return <button {...props} className={clsx(styles.button, styles[variant], className)} />;
}
