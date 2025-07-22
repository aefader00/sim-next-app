"use client";

import { useState, useRef, useEffect } from "react";

export default function ImageUpload({ onChange, currentImagePath = "/faces/default.jpg" }) {
	const [preview, setPreview] = useState(null);
	const [error, setError] = useState(null);
	const fileInputRef = useRef(null);

	const MAX_SIZE_MB = 1;

	const handleFile = (file) => {
		if (!file.type.startsWith("image/")) {
			setError("Only image files are allowed.");
			return;
		}

		if (file.size > MAX_SIZE_MB * 1024 * 1024) {
			setError("Image must be under 1MB.");
			return;
		}

		setError(null);
		setPreview(URL.createObjectURL(file));
		onChange(file);
	};

	const handleDrop = (e) => {
		e.preventDefault();
		const file = e.dataTransfer.files?.[0];
		if (file) handleFile(file);
	};

	const handleClick = () => {
		fileInputRef.current.click();
	};

	const handleChange = (e) => {
		const file = e.target.files?.[0];
		if (file) handleFile(file);
	};

	// Reset preview if no file is selected and no currentImagePath changes
	useEffect(() => {
		if (!preview) setPreview(currentImagePath);
	}, [currentImagePath]);

	return (
		<div>
			<div
				onDrop={handleDrop}
				onDragOver={(e) => e.preventDefault()}
				onClick={handleClick}
				style={{
					border: "2px dashed #ccc",
					padding: "1rem",
					borderRadius: "0.5rem",
					textAlign: "center",
					cursor: "pointer",
				}}
			>
				{preview ? (
					<img src={preview} alt="Preview" style={{ maxHeight: "12rem", display: "block", margin: "0 auto" }} />
				) : (
					<p>Drag & drop or click to upload an image</p>
				)}
			</div>

			<input type="file" accept="image/*" ref={fileInputRef} style={{ display: "none" }} onChange={handleChange} />

			{error && <p style={{ color: "red", marginTop: "0.5rem" }}>{error}</p>}
		</div>
	);
}
