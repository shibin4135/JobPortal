'use client';
import { Loader2, MapPin, Briefcase } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

interface Job {
  id: string;
  title: string;
  description: string;
  company: string;
  location: string;
  user: {
    name: string;
  };
}

const JobPage = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [title, setTitle] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/get-jobs');
      const result = await response.json();
      setJobs(result.jobs);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message)
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);



  useEffect(() => {
    const fetchOnQuery = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `/api/fetch-by-query?title=${title}&location=${location}`
        );
        const result = await response.json();
        setJobs(result.result);
      } catch {
        console.log('Something went wrong');
      } finally {
        setLoading(false);
      }
    };
    fetchOnQuery()
  }, [title, location]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 px-4 py-12">
      <h1 className="text-4xl font-extrabold text-center mb-12 text-gray-800 drop-shadow-sm">
        🔍 Find Your Dream Job
      </h1>

      <div className="bg-white shadow-lg rounded-xl p-6 mb-12 max-w-5xl mx-auto flex flex-col md:flex-row gap-4 items-center">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Search job title..."
          className="w-full md:w-1/2 border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />

        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Location"
          className="w-full md:w-1/2 border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
      </div>

      {loading ? (
        <div className="flex justify-center mt-20">
          <Loader2 className="h-8 w-8 animate-spin text-gray-600" />
        </div>
      ) : jobs.length === 0 ? (
        <div className="text-center text-gray-600 mt-20">
          <p className="text-2xl font-semibold">😔 No jobs found</p>
          <p className="text-sm mt-2">Try adjusting the filters above.</p>
        </div>
      ) : (
        <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {jobs.map((job: Job) => (
            <div
              key={job.id}
              className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 p-6"
            >
              <div className="mb-3">
                <h2 className="text-xl font-bold text-blue-800">{job.title}</h2>
                <p className="text-sm text-gray-500 mt-1">
                  Posted by: <span className="font-medium">{job.user.name}</span>
                </p>
              </div>

              <div className="text-gray-700 space-y-2">
                <p className="flex items-center gap-2">
                  <Briefcase size={16} />
                  <span className="font-semibold">Company:</span> {job.company}
                </p>
                <p className="flex items-center gap-2">
                  <MapPin size={16} />
                  <span className="font-semibold">Location:</span> {job.location}
                </p>
                <p className="text-sm text-gray-600 pt-2 line-clamp-4">{job.description}</p>
              </div>

              <div className="mt-6">
                <Link
                  href={`/jobs/${job.id}`}
                  className="block text-center bg-black text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-blue-700 transition"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default JobPage;
