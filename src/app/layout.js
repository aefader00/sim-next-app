import "@ant-design/v5-patch-for-react-19";

import "antd/dist/reset.css"; // Ensure styles load correctly
import { auth } from "../../auth";
import { SessionProvider } from "next-auth/react";

import Navbar from "../components/navbar";

import Welcome from "../components/welcome";

import "./globals.css";

export default async function RootLayout({ children }) {
	const session = await auth();

	if (!session) {
		return <Welcome />;
	} else {
		return (
			<SessionProvider>
				<html>
					<body>
						<div>
							<Navbar session={session} />
							<div style={{ margin: "1rem" }}>{children}</div>
						</div>
					</body>
				</html>
			</SessionProvider>
		);
	}
}
