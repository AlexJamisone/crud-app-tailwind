import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { format } from 'path';
import { useState } from 'react';

interface FormData {
	title: string;
	content: string;
	id: string;
}

const Home: NextPage = () => {
	const [form, setForm] = useState<FormData>({
		title: '',
		content: '',
		id: '',
	});

	//Helper function

	const clearForm = () => {
		setForm({ title: '', content: '', id: '' });
	};

	//CRUD funcrion

	const create = async (data: FormData) => {
		try {
			fetch('http://localhost:3000/api/create', {
				body: JSON.stringify(data),
				headers: {
					'Content-Type': 'application/json',
				},
				method: 'POST',
			});
			clearForm();
		} catch (error) {
			console.log('Falure to create Note', error);
		}
	};

	//Custom Handler

	const handlerSubmit = async (data: FormData) => {
		try {
			create(data);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="mt-10">
			<h1 className="text-center font-bold text-2xl mt-4">Notes</h1>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					handlerSubmit(form);
				}}
				className="w-auto min-w-[25%] max-w-min mx-auto space-y-6 flex flex-col items-stretch"
			>
				<input
					type="text"
					placeholder="Title"
					value={form.title}
					onChange={(e) =>
						setForm({ ...form, title: e.target.value })
					}
					className="border-2 rounded border-gray-600 p-1"
				/>
				<textarea
					placeholder="Content"
					value={form.content}
					onChange={(e) =>
						setForm({ ...form, content: e.target.value })
					}
					className="border-2 rounded border-gray-600 p-1"
				/>
				<button
					type="submit"
					className="bg-blue-500 text-white rounded p-1"
				>
					Add +
				</button>
			</form>
		</div>
	);
};

export default Home;
