"use client";

import {
	Input as AntInput,
	Select as AntSelect,
	Switch as AntSwitch,
	Card as AntCard,
	DatePicker as AntDatePicker,
	Button as AntButton,
	Transfer as AntTransfer,
	Upload as AntUpload,
	Alert as AntAlert,
	Collapse as AntCollapse,
	Modal as AntModal,
	Divider as AntDivider,
	Table as AntTable,
	Checkbox as AntCheckbox,
	InputProps,
	SelectProps,
	SwitchProps,
	CardProps,
	DatePickerProps,
	ButtonProps as AntButtonProps,
	TransferProps,
	UploadProps,
	AlertProps,
	CollapseProps,
	ModalProps,
	DividerProps,
	TableProps,
	CheckboxProps,
} from "antd";
import { RangePickerProps } from "antd/es/date-picker";
import { forwardRef } from "react";
import Block from "@/components/ui/Block";

export interface ButtonProps extends Omit<AntButtonProps, "type"> {
	href?: string;
	type?: AntButtonProps["type"] | "submit";
}

export function Button({ href, onClick, children, type, htmlType, className, ...props }: ButtonProps) {
	const finalHtmlType = htmlType || (type === "submit" ? "submit" : undefined);
	const finalType = type === "submit" ? "primary" : type;

	return (
		<Block 
			as={AntButton} 
			href={href} 
			onClick={onClick as any} 
			htmlType={finalHtmlType} 
			type={finalType as any} 
			className={className}
			{...props} 
			pressable={true}
		>
			{children}
		</Block>
	);
}

export function Input(props: InputProps) {
	return <AntInput size="large" {...props} />;
}

export function TextArea(props: any) {
	return <AntInput.TextArea size="large" {...props} />;
}

export const Select = forwardRef<any, SelectProps>(function Select({ suffixIcon, allowClear, ...props }, ref) {
	const finalAllowClear = allowClear
		? {
			clearIcon: <span className="input-theme-icon input-select-clear-icon" aria-hidden="true" />,
			...(typeof allowClear === "object" ? allowClear : {}),
		}
		: allowClear;

	return (
		<AntSelect
			ref={ref}
			size="large"
			allowClear={finalAllowClear}
			suffixIcon={suffixIcon ?? (
				<span className="input-select-arrow" aria-hidden="true">
					<span className="input-theme-icon input-select-arrow-down" />
					<span className="input-theme-icon input-select-arrow-up" />
				</span>
			)}
			{...props}
		/>
	);
});

export function DatePicker(props: DatePickerProps) {
	return <AntDatePicker size="large" {...props} />;
}

export function RangePicker(props: RangePickerProps) {
	return <AntDatePicker.RangePicker size="large" {...props} />;
}

export function Switch(props: SwitchProps) {
	return <AntSwitch {...props} />;
}

export function Alert(props: AlertProps) {
	return <AntAlert {...props} />;
}

export function Collapse(props: CollapseProps) {
	return <AntCollapse {...props} />;
}

export function Card({ children, className, ...props }: CardProps) {
	return (
		<AntCard className={className} {...props}>
			{children}
		</AntCard>
	);
}

interface UserTransferProps extends Omit<TransferProps<any>, "dataSource" | "targetKeys" | "onChange"> {
	users: any[];
	selectedUserKeys: string[];
	setSelectedUserKeys: (keys: string[]) => void;
}

export function UserTransfer({ users, selectedUserKeys, setSelectedUserKeys, ...props }: UserTransferProps) {
	const sortedUsers = [...users].sort((a, b) => a.name.localeCompare(b.name));
	const usersWithKeys = sortedUsers.map((user) => ({
		...user,
		key: user.id,
	}));

	return (
		<AntTransfer
			{...props}
			dataSource={usersWithKeys}
			targetKeys={selectedUserKeys}
			onChange={setSelectedUserKeys as any}
			oneWay
			showSearch
			render={(item) => item.name}
		/>
	);
}

export function Upload(props: UploadProps) {
	return <AntUpload {...props} />;
}

export function Modal({ children, ...props }: ModalProps) {
	return (
		<AntModal
			{...props}
			okButtonProps={{
				...props.okButtonProps
			}}
			cancelButtonProps={{
				...props.cancelButtonProps
			}}
		>
			{children}
		</AntModal>
	);
}

export function Divider(props: DividerProps) {
	return <AntDivider style={{ borderColor: "var(--app-border)", borderWidth: "var(--app-border-width)", ...props.style }} {...props} />;
}

export function Table(props: TableProps<any>) {
	return (
		<AntTable
			{...props}
			pagination={false}
		/>
	);
}

export function Checkbox(props: CheckboxProps) {
	return <AntCheckbox {...props} />;
}

Checkbox.Group = AntCheckbox.Group;
