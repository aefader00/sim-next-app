"use client";

import { Transfer } from "antd";

export default function UsersTransfer({ users, selectedUserKeys, setSelectedUserKeys }) {
	return <Transfer dataSource={users} targetKeys={selectedUserKeys} onChange={setSelectedUserKeys} oneWay showSearch render={(item) => item.name} />;
}
