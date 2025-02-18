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
		password: "",
	});

	useEffect(() => {
		const getList = async () => {
			const { data } = await axios.get(api + "/" + id);
			setLists(data);
		};
		getList();
	}, []);

	const handleChange = (e) => {
		const listsUpdate = { ...lists };
		listsUpdate[e.target.name] = e.target.value;
		setLists(listsUpdate);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const response = await axios.put(api + "/" + id, lists);
			if (response.status === 200) {
				toast.success("contact edited successfully");
			}
            setLists({
				fullname: "",
				email: "",
				password: "",
			});
			setTimeout(() => {
				return navigate("/lists");
			}, 1000);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<form
			action=""
			className="border border-blue-400 rounded-md w-[30%] mx-auto my-20 h-auto p-5"
		>
			<Toaster position="top-right" />
			<h1 className="font-bold text-2xl text-center my-5">
				Edit your details
			</h1>
			<div className="flex flex-col  gap-2 my-2">
				<label htmlFor="fullname">Fullname</label>
				<input
					type="text"
					className="border border-blue-400 outline-blue-700 px-2 h-12 rounded-lg"
					id="fullname"
					name="name"
					value={lists.fullname}
					onChange={handleChange}
				/>
			</div>
			<div className="flex flex-col  gap-2 my-2">
				<label htmlFor="email">Email</label>
				<input
					type="email"
					className="border border-blue-400 outline-blue-700 px-2 h-12 rounded-lg"
					id="email"
					name="mail"
					value={lists.email}
					onChange={handleChange}
				/>
			</div>
			<div className="flex flex-col  gap-2 my-2">
				<label htmlFor="phonenumber">Phone Number</label>
				<input
					type="number"
					className="border border-blue-400 outline-blue-700 px-2 h-12 rounded-lg"
					id="phonenumber"
					name="number"
					value={lists.password}
					onChange={handleChange}
				/>
			</div>
			<button
				className="bg-blue-700 text-white rounded-md py-3 px-6 w-40 my-4"
				onClick={handleSubmit}
			>
				Update
			</button>
		</form>
	);
};

export default Updatename;
