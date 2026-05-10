import { GraduationCap, Plus, Trash2 } from 'lucide-react';
import React from 'react'

const Education = ({ data, onChange }) => {

    const addEducation = () => {
        const newEducation = {
            institution: "",
            degree: "",
            field: "",
            graduation_date: "",
            gpa: ""
        };

        onChange([...data, newEducation]);
    };

    const removeEducation = (index) => {
        const updated = data.filter((_, i) => i !== index);
        onChange(updated);
    };

    const updateEducation = (index, field, value) => {
        const updated = data.map((item, i) =>
            i === index ? { ...item, [field]: value } : item
        );
        onChange(updated);
    };

    return (
        <div>
            <div className='space-y-6'>
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-lg font-medium text-slate-800">Education</h3>
                        <p className="text-sm text-slate-500">Add your education details</p>
                    </div>
                    <button
                        onClick={addEducation}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-green-100 border border-green-400 rounded-lg text-sm text-slate-800 hover:bg-green-200 hover:border-green-500 transition"
                    >
                        <Plus className='size-4' /> Add Education
                    </button>
                </div>

                {data.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-10 text-center text-slate-500">
                        <GraduationCap className="size-8 mb-2 text-slate-400" />
                        <p className="text-sm font-medium">No education added yet</p>
                        <p className="text-xs">Click "Add Education" to start</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {data.map((edu, index) => (
                            <div
                                key={index}
                                className="border border-slate-200 rounded-lg p-4 bg-white space-y-3"
                            >
                                {/* Top row */}
                                <div className="flex items-center justify-between">
                                    <h4 className="text-sm font-medium text-slate-800">
                                        Education {index + 1}
                                    </h4>

                                    <button
                                        onClick={() => removeEducation(index)}
                                        className="text-red-500 hover:text-red-600 transition"
                                    >
                                        <Trash2 className="size-4" />
                                    </button>
                                </div>

                                {/* Inputs */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    <input
                                        type="text"
                                        placeholder="Institute"
                                        value={edu.institution || ""}
                                        onChange={(e) =>
                                            updateEducation(index, "institution", e.target.value)
                                        }
                                        className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />

                                    <input
                                        type="text"
                                        placeholder="Degree (e.g., B.Tech, M.Tech )"
                                        value={edu.degree || ""}
                                        onChange={(e) =>
                                            updateEducation(index, "degree", e.target.value)
                                        }
                                        className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg"
                                    />

                                    <input
                                        type="text"
                                        placeholder="Field of Study"
                                        value={edu.field || ""}
                                        onChange={(e) =>
                                            updateEducation(index, "field", e.target.value)
                                        }
                                        className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg"
                                    />

                                    <input
                                        type="text"
                                        placeholder="GPA"
                                        value={edu.gpa || ""}
                                        onChange={(e) =>
                                            updateEducation(index, "gpa", e.target.value)
                                        }
                                        className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg"
                                    />

                                    <input
                                        type="month"
                                        value={edu.graduation_date || ""}
                                        onChange={(e) =>
                                            updateEducation(index, "graduation_date", e.target.value)
                                        }
                                        className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Education
