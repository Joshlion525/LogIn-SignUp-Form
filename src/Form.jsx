import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

export const Form = () => {
	const [user, setUser] = useState([]);
	const [fullname, setFullname] = useState(" ");
	const [email, setEmail] = useState(" ");
	const [phonenumber, setPhonenumber] = useState(" ");
	const API = "http://localhost:4000/newUser";
	const [buttonText, setButtonText] = useState("Submit");
	const [loading, setLoading] = useState(false);
	const [np, setNp] = useState("");
	const REGEX = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;

	const handleFullname = (event) => {
		setFullname(event.target.value);
	};
	const handleEmail = (event) => {
		setEmail(event.target.value);
	};
	const handleNumber = (event) => {
		setPhonenumber(event.target.value);
	};

	const addUser = async (event) => {
		event.preventDefault();

		const user = { name: fullname, mail: email, number: phonenumber };
		setUser((u) => [...u, user]);

		if (
			!user.name ||
			user.name === " " ||
			!user.mail ||
			user.mail === " " ||
			!user.number ||
			user.number === " "
		) {
			toast.error("Please fill all fields");
			return;
		}
		if (REGEX.test(user.mail) === false) {
			toast.error("Invalid email");
			return;
		}

		setButtonText("Submitting...");
		setLoading(true);
		try {
			const response = await axios.post(API, user);

			if (response.status === 201) {
				setTimeout(() => {
					setFullname("");
					setEmail("");
					setPhonenumber("");
					setButtonText(buttonText);
					setLoading(false);
					setNp("Next page");
					toast.success("added seccessfully");
				}, 2000);
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<form
			className="border border-blue-400 rounded-md w-[30%] mx-auto my-20 h-auto p-5"
			onSubmit={addUser}
		>
			<h1 className="font-bold text-2xl text-center my-5 ">
				Add Contact Form
			</h1>
			<div className="flex flex-col  gap-2 my-2">
				<label htmlFor="fullname">Fullname</label>
				<input
					type="text"
					className="border border-blue-400 outline-blue-700 px-2 h-12 rounded-lg"
					id="fullname"
					value={fullname}
					onChange={handleFullname}
				/>
			</div>
			<div className="flex flex-col  gap-2 my-2">
				<label htmlFor="email">Email</label>
				<input
					type="email"
					className="border border-blue-400 outline-blue-700 px-2 h-12 rounded-lg"
					id="email"
					value={email}
					onChange={handleEmail}
				/>
			</div>
			<div className="flex flex-col  gap-2 my-2">
				<label htmlFor="phonenumber">Phone Number</label>
				<input
					type="number"
					className="border border-blue-400 outline-blue-700 px-2 h-12 rounded-lg"
					id="phonenumber"
					value={phonenumber}
					onChange={handleNumber}
				/>
			</div>
			<div className="">
				<button
					className={
						loading
							? `bg-blue-300 text-white rounded-md py-3 px-6 w-40 my-4`
							: `bg-blue-700 text-white rounded-md py-3 px-6 w-40 my-4`
					}
				>
					{buttonText}
				</button>
				<Link to={"/lists"} className="font-bold ml-36 ">
					{np}
				</Link>
			</div>
		</form>
	);
};
