import "@ant-design/v5-patch-for-react-19";
import "antd/dist/reset.css";

import { SessionProvider } from "next-auth/react";
import { auth } from "@/authentication";

import "./globals.css";

import Navbar from "@/components/navbar";
import Welcome from "@/components/Welcome";

export default async function RootLayout({ children }) {
	const session = await auth();
	return (
		<SessionProvider>
			<html>
				<body>
					<Navbar session={session} />
					<div style={{ margin: "1rem" }}>{session ? children : <Welcome />}</div>
				</body>
			</html>
		</SessionProvider>
	);
}
