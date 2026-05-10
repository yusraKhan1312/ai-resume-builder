import { Plus, Sparkles, X } from 'lucide-react'
import React, { useState } from 'react'

const Skills = ({ data, onChange }) => {

    const [newSkills, setNewSkills] = useState("")

    const addSkills = () => {
        if (newSkills.trim() && !data.includes(newSkills.trim())) {
            onChange([...data, newSkills.trim()])
            setNewSkills("");
        }
    }

    const removeSkills = (indexToRemove) => {
        onChange(data.filter((_, index) => index !== indexToRemove))
    }

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            addSkills();
        }
    }

    return (
        <div className="space-y-6">

            {/* Heading */}
            <div>
                <h3 className="text-lg font-semibold text-slate-800">Skills</h3>
                <p className="text-sm text-slate-500">Add your technical & soft skills</p>
            </div>

            {/* Input + Button */}
            <div className="flex items-center gap-2">
                <input
                    type="text"
                    placeholder="Enter a skill (e.g. React, Communication)"
                    className="flex-1 px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onChange={(e) => setNewSkills(e.target.value)}
                    value={newSkills}
                    onKeyDown={handleKeyPress}
                />

                <button
                    onClick={addSkills}
                    disabled={!newSkills.trim()}
                    className="inline-flex items-center gap-1 px-3 py-2 text-sm bg-black text-white rounded-lg hover:bg-slate-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <Plus size={14} /> Add
                </button>
            </div>

            {/* Skills List */}
            {data.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                    {data.map((skills, index) => (
                        <span
                            key={index}
                            className="flex items-center gap-1 px-3 py-1 text-sm bg-slate-100 text-slate-700 rounded-full"
                        >
                            {skills}
                            <button
                                onClick={() => removeSkills(index)}
                                className="text-slate-500 hover:text-red-500 transition"
                            >
                                <X className="w-3 h-3" />
                            </button>
                        </span>
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-8 text-center text-slate-500">
                    <Sparkles className="size-6 mb-2 text-slate-400" />
                    <p className="text-sm font-medium">No skills added yet</p>
                    <p className="text-xs">Add your technical & soft skills above</p>
                </div>
            )}

            {/* Tip */}
            <div className="text-xs text-slate-500 bg-slate-100 p-3 rounded-lg">
                <p>
                    <strong>Tip:</strong> Add 8-12 relevant skills, including both technical
                    and soft skills (e.g., programming languages, tools, leadership,
                    communication).
                </p>
            </div>

        </div>
    )
}

export default Skills
