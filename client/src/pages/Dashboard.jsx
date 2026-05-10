import { FilePenLineIcon, LoaderCircleIcon, PencilIcon, PlusIcon, TrashIcon, UploadCloud, UploadCloudIcon, XIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import api from '../configs/api';
import pdfToText from 'react-pdftotext';

const Dashboard = () => {

  const { user, token } = useSelector(state => state.auth)

  const colors = ['#22c55e', '#3b82f6', '#eab308', '#ec4899', '#a855f7'];
  const [allResumes, setAllResumes] = useState([])
  const [showCreateResumes, setShowCreateResumes] = useState(false)
  const [showUploadResumes, setShowUploadResumes] = useState(false)
  const [title, setTitle] = useState('')
  const [resume, setResume] = useState(null)
  const [editResumeId, setEditResumeId] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()

  const loadAllResumes = async () => {
    try {
      const { data } = await api.get('/api/users/resumes', {
        headers: {
          Authorization: token
        }
      })
      setAllResumes(data.resumes)
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    }
  }

  const createResume = async (e) => {
    try {
      e.preventDefault()
      const { data } = await api.post('/api/resumes/create', { title }, {
        headers: {
          Authorization: token
        }
      })
      setAllResumes([...allResumes, data.resume])
      setTitle('')
      setShowCreateResumes(false)
      navigate(`/app/builder/${data.resume._id}`)
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    }
  }

  const uploadResume = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const resumeText = await pdfToText(resume)
      const { data } = await api.post('/api/ai/upload-resume', { title, resumeText }, {
        headers: {
          Authorization: token
        }
      })
      setTitle('')
      setResume(null)
      setShowUploadResumes(false)
      navigate(`/app/builder/${data.resumeId}`)
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    }
    setIsLoading(false)
  }

  const editTitle = async (e) => {
    try {
      e.preventDefault()
      const { data } = await api.put(`/api/resumes/update`, { resumeId: editResumeId, resumeData: { title } }, {
        headers: {
          Authorization: token
        }
      })
      setAllResumes(allResumes.map(resume => resume._id === editResumeId ? { ...resume, title } : resume))
      setTitle('')
      setEditResumeId('')
      toast.success(data.message)
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    }

  }

  const deleteResume = async (resumeId) => {
    try {
      const confirmDelete = window.confirm("Are you sure you want to delete this resume?");
      if (confirmDelete) {
        const { data } = await api.delete(`/api/resumes/delete/${resumeId}`, {
          headers: {
            Authorization: token
          }
        })
        setAllResumes(allResumes.filter(resume => resume._id !== resumeId))
        toast.success(data.message)
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    }
  }

  useEffect(() => {
    loadAllResumes()
  }, [])

  return (
    <div className="pt-16">
      <div className="max-w-7xl mx-auto px-4 py-10">

        {/* Mobile Welcome */}
        <p className="text-2xl font-semibold mb-8 bg-gradient-to-r from-green-500 to-blue-500 text-transparent bg-clip-text sm:hidden">
          Welcome, yusra
        </p>

        {/* Action Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

          {/* Create Resume */}
          <button onClick={() => setShowCreateResumes(true)} className="flex flex-col items-center justify-center gap-3 p-6 rounded-2xl bg-white shadow-sm hover:shadow-lg transition-all duration-300 border border-slate-200 hover:border-green-400 group">
            <PlusIcon className="size-10 text-green-600 group-hover:scale-110 transition-transform duration-300" />

            <p className="text-sm font-medium text-slate-700">
              Create Resume
            </p>
          </button>

          {/* Upload Resume */}
          <button onClick={() => setShowUploadResumes(true)} className="flex flex-col items-center justify-center gap-3 p-6 rounded-2xl bg-white shadow-sm hover:shadow-lg transition-all duration-300 border border-slate-200 hover:border-blue-400 group">

            <UploadCloudIcon className="size-10 text-blue-600 group-hover:scale-110 transition-transform duration-300" />

            <p className="text-sm font-medium text-slate-700 text-center">
              Upload Existing Resume
            </p>
          </button>
        </div>

        <hr className="my-10 border-slate-300" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {allResumes.map((resume, index) => {
            const color = colors[index % colors.length];
            return (
              <button
                key={index}
                onClick={() => navigate(`/app/builder/${resume._id}`)}
                className="group flex flex-col items-start justify-between p-5 rounded-2xl border shadow-sm hover:shadow-lg transition-all duration-300"
                style={{
                  background: `linear-gradient(135deg, ${color}10, ${color}30)`,
                  borderColor: `${color}40`,
                }}
              >
                {/* Icon */}
                <FilePenLineIcon
                  className="size-6 mb-2 transition-transform duration-300 group-hover:scale-110"
                  style={{ color: color }}
                />

                {/* Resume Name */}
                <p
                  className="text-sm font-medium transition-all group-hover:scale-105"
                  style={{ color: color }}
                >
                  {resume.title}
                </p>

                {/* Date */}
                <p
                  className="text-xs mt-1"
                  style={{ color: `${color}99` }}
                >
                  Updated on {new Date(resume.updatedAt).toLocaleDateString()}
                </p>

                {/* Actions */}
                <div onClick={(e) => e.stopPropagation()} className="flex gap-3 mt-4">
                  <TrashIcon onClick={() => deleteResume(resume._id)} className="size-5 text-red-500 hover:text-red-700 transition-colors " />
                  <PencilIcon onClick={() => { setEditResumeId(resume._id); setTitle(resume.title) }} className="size-5 text-blue-500 hover:text-blue-700 transition-colors " />
                </div>
              </button>
            );
          })}
        </div>

        {showCreateResumes && (
          <form
            onSubmit={createResume}
            onClick={() => setShowCreateResumes(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-4"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative bg-white rounded-2xl p-6 w-full max-w-md shadow-xl animate-fadeIn"
            >
              {/* Close Icon */}
              <XIcon
                className="absolute top-4 right-4 size-5 text-slate-500 hover:text-slate-700 cursor-pointer transition-colors"
                onClick={() => {
                  setShowCreateResumes(false);
                  setTitle('');
                }}
              />

              {/* Heading */}
              <h2 className="text-lg font-semibold text-slate-800 mb-4">
                Create New Resume
              </h2>

              {/* Input */}
              <input
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                type="text"
                placeholder="Enter resume title"
                className="w-full px-4 py-2.5 mb-4 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                required
              />

              {/* Button */}
              <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2.5 rounded-lg font-medium transition-all duration-200 shadow-sm hover:shadow-md">
                Create Resume
              </button>
            </div>
          </form>
        )}

        {
          showUploadResumes && (
            <form
              onSubmit={uploadResume}
              onClick={() => setShowUploadResumes(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-4"
            >
              <div
                onClick={(e) => e.stopPropagation()}
                className="relative bg-white rounded-2xl p-6 w-full max-w-md shadow-xl animate-fadeIn"
              >
                {/* Close Icon */}
                <XIcon
                  className="absolute top-4 right-4 size-5 text-slate-500 hover:text-slate-700 cursor-pointer transition-colors"
                  onClick={() => {
                    setShowUploadResumes(false);
                    setTitle('');
                  }}
                />

                {/* Heading */}
                <h2 className="text-lg font-semibold text-slate-800 mb-4">
                  Upload Resume
                </h2>

                {/* Input */}
                <input
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                  type="text"
                  placeholder="Enter resume title"
                  className="w-full px-4 py-2.5 mb-4 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                  required
                />

                <div>
                  <label
                    htmlFor="resume-input"
                    className="block text-sm font-medium text-slate-700 mb-3"
                  >
                    Choose a file to upload:

                    <div className="mt-2 flex flex-col items-center justify-center gap-2 p-6 border-2 border-dashed border-slate-300 rounded-2xl cursor-pointer hover:border-green-500 hover:bg-green-50 transition-all duration-200 text-center">

                      {resume ? (
                        <p className="text-green-600 font-medium break-all">
                          {resume.name}
                        </p>
                      ) : (
                        <>
                          <UploadCloud className="size-12 text-slate-400" />
                          <p className="text-sm text-slate-500">
                            Click to upload or drag & drop
                          </p>
                        </>
                      )}

                    </div>
                  </label>
                  <input
                    id="resume-input"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    hidden
                    onChange={(e) => setResume(e.target.files[0])}
                  />
                </div>

                {/* Button */}
                <button disabled={isLoading} className="w-full bg-green-600 hover:bg-green-700 text-white py-2.5 rounded-lg font-medium transition-all duration-200 shadow-sm hover:shadow-md flex items-center justify-center gap-2 ">
                  {isLoading && <LoaderCircleIcon className='animate-spin size-4 text-slate-300 ' />}
                  {isLoading ? 'Uploading...' : 'Upload Resume'}
                </button>
              </div>
            </form>
          )
        }

        {editResumeId && (
          <form
            onSubmit={editTitle}
            onClick={() => setEditResumeId('')}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-4"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative bg-white rounded-2xl p-6 w-full max-w-md shadow-xl animate-fadeIn"
            >
              {/* Close Icon */}
              <XIcon
                className="absolute top-4 right-4 size-5 text-slate-500 hover:text-slate-700 cursor-pointer transition-colors"
                onClick={() => {
                  setEditResumeId('');
                  setTitle('');
                }}
              />

              {/* Heading */}
              <h2 className="text-lg font-semibold text-slate-800 mb-4">
                Edit Resume Title
              </h2>

              {/* Input */}
              <input
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                type="text"
                placeholder="Enter resume title"
                className="w-full px-4 py-2.5 mb-4 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                required
              />

              {/* Button */}
              <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2.5 rounded-lg font-medium transition-all duration-200 shadow-sm hover:shadow-md">
                Update Resume
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  )
}

export default Dashboard
