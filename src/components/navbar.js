import { isCurrentUserAdmin, LogOut } from "../actions";
import styles from "./navbar.module.css";
import Button from "@/components/ui/Button";
import NavSelect from "./ui/NavSelect";

export default async function Navbar({ session }) {
	const admin = await isCurrentUserAdmin();

	const pages = [
		{ href: "/users", label: "Names & Faces" },
		{ href: "/thursdays", label: "Thursdays" },
		...(admin ? [{ href: "/semesters", label: "Admin" }] : []),
		{ href: `/users/${session.user.username}`, label: "My Profile" },
	];

	return (
		<nav className={styles.navbar}>
			{/* Brand always visible */}
			<div className={styles.brand}>SIM</div>

			{/* Desktop Buttons */}
			<div className={styles.desktopMenu}>
				{pages.map((p) => (
					<Button key={p.label} href={p.href}>
						{p.label}
					</Button>
				))}
			</div>

			{/* Mobile Dropdown */}
			<div className={styles.mobileMenu}>
				<NavSelect pages={pages} />
			</div>
		</nav>
	);
}
