import { Loader2, Sparkles } from 'lucide-react'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import api from '../configs/api'
import toast from 'react-hot-toast'

const ProfessionalSummary = ({ data, onChange, setResumeData }) => {

    const { token } = useSelector(state => state.auth)
    const [isGenerating, setIsGenerating] = useState(false)

    const generateSummary = async () => {
        try {
            setIsGenerating(true)
            const prompt = `enhance my professional summary "${data}"`;
            const response = await api.post('/api/ai/enhance-pro-sum', {userContent: prompt}, {headers: {Authorization: token}})
            setResumeData(prev => ({...prev, professional_summary: response.data.enhancedContent}))
        } catch (error) {
            toast.error(error?.response?.data?.message || error.message)
        }
        finally{
            setIsGenerating(false)
        }
    }

    return (
        <div className="space-y-2">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-medium text-slate-800">Professional Summary</h3>
                    <p className="text-sm text-slate-500">Add summary for your Resume here</p>
                </div>
                <button disabled={isGenerating} onClick={generateSummary} className="flex items-center gap-1.5 px-3 py-1.5 bg-green-100 border border-green-400 rounded-lg text-sm text-slate-800 hover:bg-green-200 hover:border-green-500 transition"
                >
                    {isGenerating ? (<Loader2 className='animate-spin size-4' />) : (<Sparkles className='size-4' />)}
                    {isGenerating ? "Thinking..." : "AI Suggestion"}
                    
                </button>
            </div>
            <div className='mt-6'>
                <textarea
                    id="professionalSummary"
                    rows={6}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg text-sm text-slate-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    placeholder="Write a brief summary of your professional background and key strengths..."
                    value={data || ""}
                    onChange={(e) => onChange(e.target.value)}
                />
                <div className="text-xs text-slate-500 bg-slate-100 p-3 rounded-lg">
                    <p>
                        <strong>Tip: </strong>Highlight your years of experience, key skills, and what you bring to potential employers in a concise (3-4 sentence) manner.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default ProfessionalSummary
