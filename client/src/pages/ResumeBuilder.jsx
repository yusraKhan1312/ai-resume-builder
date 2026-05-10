import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeftIcon, Briefcase, FolderIcon, GraduationCap, Sparkles, User, FileText, ChevronLeft, ChevronRight, Share2Icon, EyeIcon, EyeOffIcon, DownloadIcon } from 'lucide-react';
import PersonalInfoForm from '../components/PersonalInfoForm';
import ResumePreview from '../components/ResumePreview';
import TemplateSelector from '../components/TemplateSelector';
import ColorPicker from '../components/ColorPicker';
import ProfessionalSummary from '../components/ProfessionalSummary';
import Experience from '../components/Experience';
import Education from '../components/Education';
import Project from '../components/Project';
import Skills from '../components/Skills';
import { useSelector } from 'react-redux';
import api from '../configs/api';
import toast from 'react-hot-toast';

const ResumeBuilder = () => {
  const { resumeId } = useParams()
  const { token } = useSelector(state => state.auth)

  const [resumeData, setResumeData] = useState({
    _id: "",
    title: "",
    personal_info: {},
    professional_summary: "",
    experience: [],
    education: [],
    project: [], 
    skills: [],
    template: "classic",
    accent_color: "#000000",
    public: false,
  });

  const loadExistingResume = async () => {
    try {
      const { data } = await api.get(`/api/resumes/get/${resumeId}`, {
        headers: {
          Authorization: token
        }
      })
      if (data.resume) {
        setResumeData(data.resume)
        document.title = data.resume.title
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [removeBackground, setRemoveBackground] = useState(false);

  const sections = [
    { id: "personal", name: "Personal Info", icon: User },
    { id: "summary", name: "Summary", icon: FileText },
    { id: "experience", name: "Experience", icon: Briefcase },
    { id: "education", name: "Education", icon: GraduationCap },
    { id: "project", name: "Project", icon: FolderIcon },
    { id: "skills", name: "Skills", icon: Sparkles },
  ]

  const activateSection = sections[activeSectionIndex]

  useEffect(() => {
    loadExistingResume();
  }, [])

  const changeResumeVisibility = async () => {
    try {

      const formData = new FormData();

      formData.append("resumeId", resumeId);

      formData.append(
        "resumeData",
        JSON.stringify({ public: !resumeData.public })
      );

      const { data } = await api.put(
        `/api/resumes/update`,
        formData,
        {
          headers: {
            Authorization: token
          }
        }
      );

      setResumeData({
        ...resumeData,
        public: !resumeData.public
      });

      toast.success(data.message);

    } catch (error) {
      console.log('error saving resume:', error);
    }
  }

  const handleShare = () => {
    const frontEndUrl = window.location.href.split(`/app/`)[0];
    const resumeUrl = frontEndUrl + `/view/` + resumeId;

    if (navigator.share) {
      navigator.share({ url: resumeUrl, text: "My Resume", })
    } else {
      alert('Share not supporrted on this bro')
    }
  }

  const downloadResume = () => {
    window.print();
  }

  const saveResume = async () => {
    try {

      let updatedResumeData = structuredClone(resumeData);

      // remove image from updated resume data
      if (typeof resumeData.personal_info.image === 'object') {
        delete updatedResumeData.personal_info.image;
      }

      const formData = new FormData();

      formData.append("resumeId", resumeId);

      formData.append(
        "resumeData",
        JSON.stringify(updatedResumeData)
      );

      if (removeBackground) {
        formData.append("removeBackground", "yes");
      }

      if (typeof resumeData.personal_info.image === 'object') {
        formData.append("image", resumeData.personal_info.image);
      }

      const { data } = await api.put(
        `/api/resumes/update`,
        formData,
        {
          headers: {
            Authorization: token
          }
        }
      );

      setResumeData(data.resume);

      toast.success(data.message);

    } catch (error) {
      console.error("error saving resume:", error);
    }
  }

  return (
    <div className="pt-20 bg-slate-50 min-h-screen">

      <div className="max-w-7xl mx-auto px-4 py-6">
        <Link
          to="/app"
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm text-slate-700 hover:bg-white hover:shadow-sm hover:text-black transition"
        >
          <ArrowLeftIcon className="size-4" />
          <span className="font-medium">Back to Dashboard</span>
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-8">
        <div className="grid lg:grid-cols-12 gap-6">

          {/* Left panel: form */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-xl shadow-sm p-5 space-y-6">

              {/* progress bar */}
              <div className="space-y-1">
                <hr className="border-slate-300 pb-0.5 bg-slate-300 rounded-2xl" />
                <hr
                  className="border-green-500 p-1 bg-green-600 rounded-2xl"
                  style={{ width: `${(activeSectionIndex / (sections.length - 1)) * 100}%` }}
                />
              </div>

              {/* section Navigation */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-3 border-b border-slate-200">
                {/* LEFT */}
                <div className="flex items-center gap-3">
                  <TemplateSelector
                    selectedTemplate={resumeData.template}
                    onChange={(template) =>
                      setResumeData((prev) => ({ ...prev, template }))
                    }
                  />
                  <ColorPicker
                    selectedColor={resumeData.accent_color}
                    onChange={(color) =>
                      setResumeData((prev) => ({ ...prev, accent_color: color }))
                    }
                  />
                </div>

                {/* RIGHT */}
                <div className="flex flex-wrap items-center gap-2 ml-auto">
                  {activeSectionIndex !== 0 && (
                    <button
                      onClick={() => setActiveSectionIndex(prev => Math.max(prev - 1, 0))}
                      className="inline-flex items-center gap-1 px-3 py-1.5 text-sm rounded-lg text-slate-700 hover:text-black hover:bg-slate-100 transition"
                    >
                      <ChevronLeft size={14} /><span className="max-sm:hidden font-medium">Preview</span>

                    </button>
                  )}

                  <button
                    onClick={() => setActiveSectionIndex(prev => Math.max(prev + 1, 0))}
                    className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm text-slate-600 hover:text-black hover:bg-slate-100 transition ${activeSectionIndex === sections.length - 1 && 'opacity-50 cursor-not-allowed'
                      }`}
                    disabled={activeSectionIndex === sections.length - 1}
                  >
                    Next<ChevronRight size={14} />
                  </button>
                </div>

              </div>

              {/* Form Content */}
              <div className="space-y-4">
                {activateSection.id === "personal" && (
                  <PersonalInfoForm
                    data={resumeData.personal_info}
                    onChange={(data) =>
                      setResumeData(prev => ({ ...prev, personal_info: data }))
                    }
                    removeBackground={removeBackground}
                    setRemoveBackground={setRemoveBackground}
                  />
                )}
                {activateSection.id === "summary" && (
                  <ProfessionalSummary
                    data={resumeData.professional_summary}
                    onChange={(value) =>
                      setResumeData(prev => ({ ...prev, professional_summary: value }))
                    }
                    setResumeData={setResumeData}
                  />
                )}
                {activateSection.id === "experience" && (
                  <Experience
                    data={resumeData.experience}
                    onChange={(value) =>
                      setResumeData(prev => ({ ...prev, experience: value }))
                    }
                  />
                )}
                {activateSection.id === "education" && (
                  <Education
                    data={resumeData.education}
                    onChange={(value) =>
                      setResumeData(prev => ({ ...prev, education: value }))
                    }
                  />
                )}
                {activateSection.id === "project" && (
                  <Project
                    data={resumeData.project}
                    onChange={(value) =>
                      setResumeData(prev => ({ ...prev, project: value }))
                    }
                  />
                )}
                {activateSection.id === "skills" && (
                  <Skills
                    data={resumeData.skills}
                    onChange={(value) =>
                      setResumeData(prev => ({ ...prev, skills: value }))
                    }
                  />
                )}

              </div>

              <button onClick={() => {toast.promise(saveResume, { loading: 'Saving...' })}} className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg shadow-sm hover:bg-green-900 border-green-800 active:scale-95 transition disabled:opacity-50 disabled:cursor-not-allowed">
                Save Changes
              </button>

            </div>
          </div>


          {/* right panel: preview */}
          <div className="lg:col-span-7 max-lg:mt-6 ">
            <div className="relative w-full">

              {/* Buttons container */}
              <div className="absolute bottom-3 left-0 right-0 flex justify-end items-center gap-2">

                {resumeData.public && (
                  <button
                    onClick={handleShare}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-100 border border-blue-400 rounded-lg text-sm text-slate-800 hover:bg-blue-200 hover:border-blue-500 hover:text-black transition"
                  >
                    <Share2Icon size={15} />Share
                  </button>
                )}

                <button
                  onClick={changeResumeVisibility}
                  className="flex items-center gap-2 px-4 py-2 bg-purple-100 border border-purple-400 rounded-lg text-sm text-slate-800 hover:bg-purple-200 hover:border-purple-500 hover:text-black transition"
                >
                  {resumeData.public ? <EyeIcon size={15} /> : <EyeOffIcon size={15} />}
                  {resumeData.public ? "Public" : "Private"}
                </button>

                <button
                  onClick={downloadResume}
                  className="flex items-center gap-1.5 px-4 py-2 bg-green-100 border border-green-400 rounded-lg text-sm text-slate-800 hover:bg-green-200 hover:border-green-500 hover:text-black transition"
                >
                  <DownloadIcon size={15} />
                  Download
                </button>

              </div>
            </div>

            <ResumePreview
              data={resumeData}
              template={resumeData.template}
              accentColor={resumeData.accent_color}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResumeBuilder