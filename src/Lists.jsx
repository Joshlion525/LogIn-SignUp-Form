import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const Lists = () => {
	const [newUsers, setNewUsers] = useState();
	const navigate = useNavigate();
	console.log(newUsers);

	const getUsers = async () => {
		try {
			const response = await axios.get("http://localhost:4000/newUser");
			setNewUsers(response.data);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getUsers();
	}, []);

	const deleteUser = async (id) => {
		try {
			// setNewUsers(newUsers.filter((n) => n.id !== id));
			const response = await axios.delete(
				`http://localhost:4000/newUser/${id}`
			);
			if (response.status === 200) {
				toast.success("Contact deleted successfully");
				getUsers();
			}
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<div className="overflow-x-auto">
			<Toaster position="top-right" />
			<Link to={"/"} className="font-bold float-right">
				Back to Homepage
			</Link>
			<table className="table-auto min-w-full">
				<thead>
					<tr>
						<th className="px-4 py-2">ID</th>
						<th className="px-4 py-2">Name</th>
						<th className="px-4 py-2">Email</th>
						<th className="px-4 py-2">Phone Number</th>
						<th className="px-4 py-2">Actions</th>
					</tr>
				</thead>
				<tbody>
					{newUsers &&
						newUsers.map((newUser) => (
							<tr key={newUser.id}>
								<td className="border px-4 py-2">
									{newUser.id}
								</td>
								<td className="border px-4 py-2">
									{newUser.name}
								</td>
								<td className="border px-4 py-2">
									{newUser.mail}
								</td>
								<td className="border px-4 py-2">
									{newUser.number}
								</td>
								<td className="border px-4 py-2">
									<button
										className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
										onClick={() => deleteUser(newUser.id)}
									>
										Delete
									</button>
									<button
										className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded ml-2"
										onClick={() =>
											navigate(`/update/${newUser.id}`)
										}
									>
										Edit
									</button>
								</td>
							</tr>
						))}
				</tbody>
			</table>
		</div>
	);
};

export default Lists;
