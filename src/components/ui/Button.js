"use client";
import styles from "./Control.module.css";
import clsx from "clsx";
import Link from "next/link";

export default function Button({ href, children, className, ...props }) {
	const classes = clsx(styles.controlContainer, className);

	// Base (black, stationary)
	const buttonBase = <div className={styles.buttonBase}></div>;

	// Top (movable button)
	const topButton = <span className={styles.control}>{children}</span>;

	// If href exists, render as Link
	if (href) {
		return (
			<Link href={href} className={classes} {...props}>
				{buttonBase}
				{topButton}
			</Link>
		);
	}

	// Otherwise, render as div button
	return (
		<div className={classes} {...props}>
			{buttonBase}
			{topButton}
		</div>
	);
}
