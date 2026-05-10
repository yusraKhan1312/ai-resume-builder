import { Briefcase, Loader2, Plus, Sparkles, Trash2 } from 'lucide-react'
import React from 'react'
import { useState } from 'react';
import { useSelector } from 'react-redux';
import api from '../configs/api';
import toast from 'react-hot-toast';

const Experience = ({ data, onChange }) => {

    const { token } = useSelector(state => state.auth)
    const [generatingIndex, setGeneratingIndex] = useState(-1)

    const addExperience = () => {
        const newExperience = {
            company: "",
            position: "",
            start_date: "",
            end_date: "",
            description: "",
            is_current: false
        };

        onChange([...data, newExperience]);
    };

    const removeExperience = (index) => {
        const updated = data.filter((_, i) => i !== index);
        onChange(updated);
    };

    const updateExperience = (index, field, value) => {
        const updated = data.map((item, i) =>
            i === index ? { ...item, [field]: value } : item
        );
        onChange(updated);
    };

    const generateDescription = async (index) => {

        setGeneratingIndex(index);
        const experience = data[index];
        const prompt = `enhance this job description ${experience.description} for the position ${experience.position} at ${experience.company}.`;

        try {
            const { data } = await api.post(
                '/api/ai/enhance-pro-desc',
                { userContent: prompt },
                {
                    headers: {
                        Authorization: token
                    }
                }
            );
            updateExperience(
                index,
                "description",
                data.enhancedContent
            );
        } catch (error) {
            toast.error(
                error?.response?.data?.message || error.message
            );
        } finally {
            setGeneratingIndex(null);
        }
    }

    return (
        <div className='space-y-6'>
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-medium text-slate-800">Professional Experience</h3>
                    <p className="text-sm text-slate-500">Add your Job experience</p>
                </div>
                <button
                    onClick={addExperience}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-green-100 border border-green-400 rounded-lg text-sm text-slate-800 hover:bg-green-200 hover:border-green-500 transition"
                >
                    <Plus className='size-4' /> Add Experience
                </button>
            </div>

            {data.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-10 text-center text-slate-500">
                    <Briefcase className="size-8 mb-2 text-slate-400" />
                    <p className="text-sm font-medium">No experience added yet</p>
                    <p className="text-xs">Click "Add Experience" to start</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {data.map((experience, index) => (
                        <div
                            key={index}
                            className="border border-slate-200 rounded-lg p-4 bg-white space-y-3"
                        >
                            {/* Top row */}
                            <div className="flex items-center justify-between">
                                <h4 className="text-sm font-medium text-slate-800">
                                    Experience {index + 1}
                                </h4>

                                <button
                                    onClick={() => removeExperience(index)}
                                    className="text-red-500 hover:text-red-600 transition"
                                >
                                    <Trash2 className="size-4" />
                                </button>
                            </div>

                            {/* Inputs */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <input
                                    type="text"
                                    placeholder="Company"
                                    value={experience.company || ""}
                                    onChange={(e) =>
                                        updateExperience(index, "company", e.target.value)
                                    }
                                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />

                                <input
                                    type="text"
                                    placeholder="Position"
                                    value={experience.position || ""}
                                    onChange={(e) =>
                                        updateExperience(index, "position", e.target.value)
                                    }
                                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />

                                <input
                                    type="month"
                                    value={experience.start_date || ""}
                                    onChange={(e) =>
                                        updateExperience(index, "start_date", e.target.value)
                                    }
                                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg"
                                />

                                <input
                                    type="month"
                                    value={experience.end_date || ""}
                                    onChange={(e) =>
                                        updateExperience(index, "end_date", e.target.value)
                                    }
                                    disabled={experience.is_current}
                                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg disabled:bg-gray-50"
                                />
                            </div>

                            <div className="space-y-3">

                                {/* checkbox */}
                                <label className="flex items-center gap-2 text-sm text-slate-700">
                                    <input
                                        type="checkbox"
                                        checked={experience.is_current}
                                        onChange={(e) =>
                                            updateExperience(index, "is_current", e.target.checked)
                                        }
                                        className="accent-blue-500"
                                    />
                                    <span>Currently working here</span>
                                </label>

                                {/* AI button */}
                                <div className="flex justify-end">
                                    <button
                                        onClick={() => generateDescription(index)}
                                        disabled={generatingIndex === index || !experience.position || !experience.company}
                                        type="button"
                                        className="flex items-center gap-2 text-xs px-3 py-1.5 bg-slate-100 rounded-md hover:bg-slate-200 transition"
                                    >
                                        {generatingIndex === index ? (<Loader2 className='size-3 animate-spin' />) : (<Sparkles className="size-3" />)}
                                        {generatingIndex === index ? "Thinking..." : "Improve with AI"}
                                    </button>
                                </div>

                                {/* textarea */}
                                <textarea
                                    placeholder="Describe your work..."
                                    value={experience.description || ""}
                                    onChange={(e) =>
                                        updateExperience(index, "description", e.target.value)
                                    }
                                    rows={4}
                                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />

                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default Experience
