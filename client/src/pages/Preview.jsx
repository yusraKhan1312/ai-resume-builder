import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ResumePreview from '../components/ResumePreview'
import Loader from '../components/Loader'
import { ArrowLeftIcon } from 'lucide-react'
import api from '../configs/api'

const Preview = () => {

  const { resumeId } = useParams()

  const [isLoading, setIsLoading] = useState(true)
  const [resumeData, setResumeData] = useState(null)

  const loadResume = async () => {
    try {
      const {data} = await api.get(`/api/resumes/public/${resumeId}`)
      setResumeData(data.resume)
    } catch (error) {
      console.log(error.message);
    }finally{
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadResume()
  }, [])

  return resumeData ? (
    <div className='bg-slate-100 min-h-screen'>
      <div className='max-w-3xl mx-auto py-10 px-4'>
        <ResumePreview
          data={resumeData}
          template={resumeData.template}
          accentColor={resumeData.accent_color}
          classes='py-4 bg-white shadow-md rounded-lg'
        />
      </div>
    </div>
  ) : (
    <div className="flex items-center justify-center min-h-screen bg-slate-100 px-4">
      {isLoading ? (
        <Loader />
      ) : (
        <div className='text-center bg-white p-8 rounded-lg shadow-md'>
          <p className='text-lg font-semibold text-gray-700 mb-4'>
            Resume Not Found
          </p>

          <a
            href="/"
            className='inline-flex items-center justify-center text-blue-600 hover:text-blue-800 font-medium'
          >
            <ArrowLeftIcon className='mr-2 w-4 h-4' />
            Go To Home Page
          </a>
        </div>
      )}
    </div>
  )
}

export default Preview
