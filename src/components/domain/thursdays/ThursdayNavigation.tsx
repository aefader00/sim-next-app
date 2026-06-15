import { Button } from "@/components/ui/AntD";
import styles from "./ThursdayNavigation.module.css";

interface ThursdayNavigationProps {
	previous: { id: string; name: string; date: Date } | null;
	next: { id: string; name: string; date: Date } | null;
}

export default function ThursdayNavigation({ previous, next }: ThursdayNavigationProps) {
	return (
		<nav className={styles.ThursdayNavigation} aria-label="Adjacent Thursdays">
			<div className={styles.previous}>
				{previous && (
					<Button href={`/thursdays/${previous.id}`}>
						<span style={{ fontSize: "1.2rem", color: "#555", marginRight: "6px", lineHeight: 1 }}>←</span>Prior: {previous.name}
					</Button>
				)}
			</div>
			<div className={styles.next}>
				{next && (
					<Button href={`/thursdays/${next.id}`}>
						Next: {next.name}<span style={{ fontSize: "1.2rem", color: "#555", marginLeft: "6px", lineHeight: 1 }}>→</span>
					</Button>
				)}
			</div>
		</nav>
	);
}
