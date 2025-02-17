import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

export const Form = () => {
	const [fullname, setFullname] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [buttonText, setButtonText] = useState("Submit");
	const [loading, setLoading] = useState(false);
	const API = "http://localhost:3000/users";
	const REGEX = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;
	const navigate = useNavigate();

	const addUser = async (event) => {
		event.preventDefault();

		if (!fullname.trim()) {
			toast.error("Fullname cannot be empty");
			return;
		}
		if (!email.trim()) {
			toast.error("Email cannot be empty");
			return;
		}
		if (!password.trim()) {
			toast.error("Password cannot be empty");
			return;
		}
		if (!REGEX.test(email)) {
			toast.error("Invalid email format");
			return;
		}

		setButtonText("Submitting...");
		setLoading(true);

		try {
			const response = await axios.post(API, {
				fullname: fullname,
				email: email,
				password: password,
			});

			if (response.status === 201) {
				toast.success("User added successfully!");
				setTimeout(() => {
					setFullname("");
					setEmail("");
					setPassword("");
					setButtonText("Submit");
					setLoading(false);
					navigate("/lists");
				}, 1500);
			}
		} catch (error) {
			setButtonText("Submit");
			setLoading(false);

			if (error.response) {
				const { status, data } = error.response;

				if (status === 400 && data.errors) {
					const errors = data.errors;

					for (const err of errors) {
						if (err.path === "fullname" && fullname.trim())
							continue;
						if (err.path === "email" && REGEX.test(email)) continue;
						if (err.path === "password" && password.length >= 6)
							continue;

						toast.error(
							`${
								err.path.charAt(0).toUpperCase() +
								err.path.slice(1)
							}: ${err.msg}`
						);
						break;
					}
				} else if (
					status === 400 &&
					data.msg === "This user already exists"
				) {
					toast.error("User with this email already exists.");
				} else {
					toast.error("User with this email already exists");
				}
			} else {
				toast.error("Server error. Please check your connection.");
			}
		}
	};

	return (
		<form
			className="border border-blue-400 rounded-md w-[30%] mx-auto my-20 h-auto p-5"
			onSubmit={addUser}
		>
			<h1 className="font-bold text-2xl text-center my-5">
				Add Contact Form
			</h1>

			<div className="flex flex-col gap-2 my-2">
				<label htmlFor="fullname">Fullname</label>
				<input
					type="text"
					className="border border-blue-400 outline-blue-700 px-2 h-12 rounded-lg"
					id="fullname"
					value={fullname}
					onChange={(e) => setFullname(e.target.value)}
				/>
			</div>

			<div className="flex flex-col gap-2 my-2">
				<label htmlFor="email">Email</label>
				<input
					type="email"
					className="border border-blue-400 outline-blue-700 px-2 h-12 rounded-lg"
					id="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
			</div>

			<div className="flex flex-col gap-2 my-2">
				<label htmlFor="password">Password</label>
				<input
					type="password"
					className="border border-blue-400 outline-blue-700 px-2 h-12 rounded-lg"
					id="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
			</div>

			<div>
				<button
					type="submit"
					className={`${
						loading ? "bg-blue-300" : "bg-blue-700"
					} text-white rounded-md py-3 px-6 w-40 my-4`}
					disabled={loading}
				>
					{buttonText}
				</button>
				<Link to="/lists" className="font-bold ml-36">
					View Users
				</Link>
			</div>
		</form>
	);
};
