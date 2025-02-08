import LoginButton from "./loginbutton";

export default async function Welcome() {
	return (
		<html>
			<body>
				<div style={{ textAlign: "center" }}>
					<h1>
						<b>Welcome to SIM!</b>
					</h1>
					<img src={"/icon.jpg"} />
					<p>
						This is the website for the <b>Studio for Interrelated Media (SIM)</b> department of the <b>Massachusetts College of Art and Design</b>.
					</p>
					<p>This is an internal website for SIM students and faculty. Please sign in with your MassArt account to continue.</p>
					<LoginButton />
				</div>
			</body>
		</html>
	);
}
