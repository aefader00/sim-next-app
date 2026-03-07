"use client";

import { Transfer } from "antd";

export default function UsersTransfer({ users, selectedUserKeys, setSelectedUserKeys }) {
	const sortedUsers = [...users].sort((a, b) => a.name.localeCompare(b.name));

	return <Transfer dataSource={sortedUsers} targetKeys={selectedUserKeys} onChange={setSelectedUserKeys} oneWay showSearch render={(item) => item.name} />;
}
