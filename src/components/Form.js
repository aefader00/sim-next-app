import Form from "next/form";
import Button from "./Button";

import styles from "./Form.module.css";

export function FormWrapper({ action, children }) {
	return (
		<Form action={action} className={styles.Form}>
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
