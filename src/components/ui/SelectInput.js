"use client";
import base from "./Control.module.css";
import styles from "./SelectInput.module.css";
import clsx from "clsx";

export default function SelectInput({ children, className, ...props }) {
	return (
		<div className={clsx(base.controlContainer, styles.selectWrapper)}>
			<div className={base.buttonBase}></div>
			<select className={clsx(base.control, styles.selectControl, className)} {...props}>
				{children}
			</select>
		</div>
	);
}
