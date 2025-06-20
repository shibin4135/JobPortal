
import { prisma } from "../../lib/prisma"
import { Building2, MapPin, Briefcase } from "lucide-react"
import Application from "@/app/components/Application"

const JobDetail = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id
  const job = await prisma.job.findUnique({
    where: {
      id,
    },
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/80 backdrop-blur-sm shadow-2xl rounded-2xl overflow-hidden border border-white/20">
         
          <div className="bg-black px-8 py-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <Briefcase className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-white tracking-tight">Job Details</h1>
            </div>
          </div>

          <div className="p-8">
            {job ? (
              <div className="space-y-8">
            
                <div className="border-b border-gray-200 pb-6">
                  <h2 className="text-4xl font-bold  mb-4 bg-black bg-clip-text text-transparent">
                    {job.title}
                  </h2>
                  <div className="flex flex-wrap items-center gap-6 text-gray-600">
                    <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-full">
                      <Building2 className="w-5 h-5 text-blue-600" />
                      <span className="font-semibold text-gray-800">{job.company}</span>
                    </div>
                    <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-full">
                      <MapPin className="w-5 h-5 text-green-600" />
                      <span className="font-semibold text-gray-800">{job.location}</span>
                    </div>
                  </div>
                </div>

               
                <div className="bg-gradient-to-br from-gray-50 to-blue-50/30 rounded-xl p-6 border border-gray-100">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <div className="w-2 h-6 bg-gradient-to-b from-blue-500 to-indigo-500 rounded-full"></div>
                    Job Description
                  </h3>
                  <p className="text-gray-700 leading-relaxed text-lg whitespace-pre-line">{job.description}</p>
                </div>

             
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                    <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                      <Building2 className="w-5 h-5 text-blue-600" />
                      Company
                    </h4>
                    <p className="text-2xl font-bold text-gray-900">{job.company}</p>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                    <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-green-600" />
                      Location
                    </h4>
                    <p className="text-2xl font-bold text-gray-900">{job.location}</p>
                  </div>
                </div>
               <Application jobId={id}/>
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Briefcase className="w-10 h-10 text-red-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Job Not Found</h3>
                <p className="text-xl text-red-600 font-medium">The job you're looking for doesn't exist.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default JobDetail
