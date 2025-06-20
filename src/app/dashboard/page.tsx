import React from "react";
import { prisma } from "../lib/prisma";
import { auth } from "../../../auth";


interface Application {
  id: string;
  status: string;
  job: {
    title: string;
    company: string;
    location: string;
    _count: {
      applications: number
    }
  };
}

const Dashboard = async () => {
  const session = await auth();

  if (!session?.user?.id) {
    return (
      <section className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-red-600">Access Denied</h2>
          <p className="text-gray-600">You must be signed in to view this page.</p>
        </div>
      </section>
    );
  }

  const applications: Application[] = await prisma.application.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      job: {
        select: {
          title: true,
          company: true,
          location: true,
          _count: {
            select: {
              applications: true
            }
          }
        },
      },
    },

  });

  console.log(applications)


  return (
    <main className="min-h-screen bg-gray-100 py-10 px-4 md:px-10">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">My Job Applications</h1>

        {applications.length === 0 ? (
          <div className="bg-white p-6 rounded-lg shadow text-gray-600 text-center">
            You haven’t applied to any jobs yet.
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {applications.map((app) => (
              <div
                key={app.id}
                className="bg-white p-6 rounded-xl border shadow-sm hover:shadow-md transition duration-300"
              >
                <div className="mb-4">
                  <h2 className="text-xl font-semibold text-gray-900">{app.job.title}</h2>
                  <p className="text-sm text-gray-600">{app.job.company}</p>
                  <p className="text-sm text-gray-500">{app.job.location}</p>
                </div>

                <div className="flex flex-wrap items-center justify-between mt-4">
                  <span className={`inline-block text-sm font-medium px-3 py-1 rounded-full ${app.status === "PENDING"
                    ? "bg-yellow-100 text-yellow-800"
                    : app.status === "APPROVED"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                    }`}>
                    {app.status}
                  </span>

                  <span className="inline-flex items-center px-3 py-1 text-xs font-medium rounded-full bg-blue-50 text-blue-700">
                    {app.job._count.applications > 1 ? app.job._count.applications +" "+ "applicants" : app.job._count.applications + " " + "applicant"}
                  </span>
                </div>
              </div>

            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default Dashboard;
