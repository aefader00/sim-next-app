import Form from "next/form";
import Button from "./button";

import styles from "./ContentForm.module.css";

export function ContentForm({ action, button = "Submit", children }) {
	return (
		<Form action={action} className={styles.ContentForm}>
			{children}
			<Button type="submit" value={button} />
		</Form>
	);
}

export function FormLabel({ children }) {
	return <label className={styles.FormLabel}>{children}</label>;
}
export function FormInput({ children }) {
	return <div className={styles.FormInput}>{children}</div>;
}
