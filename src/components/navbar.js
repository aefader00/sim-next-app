import { isCurrentUserAdmin, LogOut } from "../actions";
import styles from "./navbar.module.css";
import Button from "@/components/ui/Button";
import MobileNavSelect from "./ui/NavSelect";

export default async function Navbar({ session }) {
	const admin = await isCurrentUserAdmin();

	const pages = [
		{ href: "/", label: "Home" },
		{ href: "/users", label: "Names & Faces" },
		{ href: "/thursdays", label: "Thursdays" },
		...(admin ? [{ href: "/semesters", label: "Manage Semester" }] : []),
		{ href: `/users/${session.user.username}`, label: "My Profile" },
	];

	return (
		<nav className={styles.navbar}>
			<Button href="/" className={styles.brand}>
				SIM
			</Button>

			{/* Desktop Buttons */}
			<div className={styles.desktopMenu}>
				{pages.map((p) => (
					<Button key={p.label} href={p.href}>
						{p.label}
					</Button>
				))}

				{/* <Button href={`/users/${session.user.username}`} className={styles.iconButton}>
					<img src={session.user.image} alt="Profile" />
				</Button>

				<form action={LogOut}>
					<Button type="submit" className={styles.iconButton}>
						<img src="/power.png" alt="Sign Out" />
					</Button>
				</form> */}
			</div>

			{/* Mobile Dropdown */}
			<div className={styles.mobileMenu}>
				<MobileNavSelect pages={pages} />
			</div>
		</nav>
	);
}
