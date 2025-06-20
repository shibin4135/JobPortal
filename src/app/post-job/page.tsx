"use client"
import React, { useState } from 'react';

const JobPage = () => {
    const [isloading, setIsloading] = useState<boolean>(false)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formdata = new FormData(e.currentTarget);
        const title = formdata.get('title') as string;
        const company = formdata.get('company') as string;
        const location = formdata.get('location') as string;
        const description = formdata.get('description') as string;
        const salary = Number(formdata.get('salary'));

        try {
            setIsloading(true)
            const response = await fetch('/api/post-job', {
                method: "POST",
                headers: {
                    'Content-type': "application/json"
                },
                body: JSON.stringify({ title, location, description, salary, company })
            })
            const result = await response.json();
            if (result.redirected) {
                window.location.href = result.url
            }
            window.location.href = '/jobs'
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error(error.message)
            }
        } finally {
            setIsloading(false)
        }

    }
    return (
        <div className="flex justify-center items-center mt-10 px-4">
            <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-8">
                <h1 className="text-3xl font-bold text-center mb-8">Post a Job</h1>
                <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit}>
                    <div className="flex flex-col">
                        <label htmlFor="title" className="mb-1 font-semibold">Title</label>
                        <input
                            type="text"
                            name="title"
                            id="title"
                            placeholder="Enter the Title"
                            className="border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring focus:border-blue-400"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="company" className="mb-1 font-semibold">Company</label>
                        <input
                            type="text"
                            name="company"
                            id="company"
                            placeholder="Enter the Company"
                            className="border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring focus:border-blue-400"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="location" className="mb-1 font-semibold">Location</label>
                        <input
                            type="text"
                            name="location"
                            id="location"
                            placeholder="Enter the Location"
                            className="border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring focus:border-blue-400"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="salary" className="mb-1 font-semibold">Salary</label>
                        <input
                            type="text"
                            name="salary"
                            id="salary"
                            placeholder="Enter the Salary"
                            className="border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring focus:border-blue-400"
                        />
                    </div>
                    <div className="md:col-span-2 flex flex-col">
                        <label htmlFor="description" className="mb-1 font-semibold">Description</label>
                        <textarea
                            rows={6}
                            name="description"
                            id="description"
                            placeholder="Enter the Description"
                            className="border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring focus:border-blue-400"
                        />
                    </div>
                    <div className="md:col-span-2 text-center pt-4">
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition duration-200"
                            disabled={isloading}
                        >
                            {isloading ? "Loading..." : "Submit Job"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default JobPage;
