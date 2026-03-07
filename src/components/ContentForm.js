import Form from "next/form";
import Button from "./ui/Button";

import styles from "./ContentForm.module.css";

export function ContentForm({ action, children }) {
	return (
		<Form action={action} className={styles.ContentForm}>
			{children}
			<Button type="submit">Submit</Button>
		</Form>
	);
}

export function FormLabel({ children }) {
	return <label className={styles.FormLabel}>{children}</label>;
}
export function FormInput({ children }) {
	return <div className={styles.FormInput}>{children}</div>;
}
