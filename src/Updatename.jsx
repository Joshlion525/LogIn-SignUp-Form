import axios from "axios";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const Updatename = () => {
	const navigate = useNavigate();
	const { id } = useParams();
	const api = "http://localhost:3000/users";

	const [lists, setLists] = useState({
		fullname: "",
		email: "",
	});

	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const getList = async () => {
			try {
				const { data } = await axios.get(`${api}/${id}`);
				setLists(data);
			} catch (error) {
				console.error("Error fetching user:", error);
				toast.error("Failed to load user data");
			}
		};
		if (id) getList();
	}, [id]);

	const handleChange = (e) => {
		setLists({ ...lists, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);

		try {
			const response = await axios.patch(`${api}/${id}`, lists);
			if (response.status === 200) {
				toast.success("Contact edited successfully");
				setTimeout(() => navigate("/lists"), 1000);
			}
		} catch (error) {
			console.error("Error updating user:", error);
			toast.error("Failed to update user");
		} finally {
			setLoading(false);
		}
	};

	return (
		<form
			className="border border-blue-400 rounded-md w-[30%] mx-auto my-20 h-auto p-5"
			onSubmit={handleSubmit}
		>
			<Toaster position="top-right" />
			<h1 className="font-bold text-2xl text-center my-5">
				Edit your details
			</h1>

			<div className="flex flex-col gap-2 my-2">
				<label htmlFor="fullname">Fullname</label>
				<input
					type="text"
					className="border border-blue-400 outline-blue-700 px-2 h-12 rounded-lg"
					id="fullname"
					name="fullname"
					value={lists.fullname}
					onChange={handleChange}
					required
				/>
			</div>

			<div className="flex flex-col gap-2 my-2">
				<label htmlFor="email">Email</label>
				<input
					type="email"
					className="border border-blue-400 outline-blue-700 px-2 h-12 rounded-lg"
					id="email"
					name="email"
					value={lists.email}
					onChange={handleChange}
					required
				/>
			</div>

			<button
				type="submit"
				className="bg-blue-700 text-white rounded-md py-3 px-6 w-40 my-4 disabled:bg-blue-400"
				disabled={loading}
			>
				{loading ? "Updating..." : "Update"}
			</button>
		</form>
	);
};

export default Updatename;
