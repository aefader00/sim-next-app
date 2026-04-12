"use client";

import styles from "./Block.module.css";
import { forwardRef, useState } from "react";
import clsx from "clsx";

const Block = forwardRef(function Block({ as = "button", children, className, disabled, onClick, ...props }, ref) {
	const [pressed, setPressed] = useState(false);

	const handleDown = () => !disabled && setPressed(true);
	const handleUp = () => setPressed(false);

	const Component = as;

	return (
		<div className={clsx(styles.wrapper, pressed && styles.pressed, disabled && styles.disabled)}>
			<div className={styles.shadow} />

			<Component
				ref={ref}
				className={clsx(styles.face, className)}
				disabled={disabled}
				onMouseDown={handleDown}
				onMouseUp={handleUp}
				onMouseLeave={handleUp}
				onTouchStart={handleDown}
				onTouchEnd={handleUp}
				onClick={onClick}
				{...props}
			>
				{children}
			</Component>
		</div>
	);
});

export default Block;
