import { LogOut } from "../actions";

export default function LogOutButton() {
	return (
		<a onClick={LogOut}>
			<img src={"/power.png"} alt={"Sign Out"} style={{ height: "1.5rem" }} />
		</a>
	);
}
