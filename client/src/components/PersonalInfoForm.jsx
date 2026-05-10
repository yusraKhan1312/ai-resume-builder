import React from 'react'
import { BriefcaseBusiness, Globe, Link, Mail, MapPin, Phone, User } from 'lucide-react'


const PersonalInfoForm = ({ data, onChange, removeBackground, setRemoveBackground }) => {

    const handleChange = (field, value) => {
        onChange({ ...data, [field]: value })
    }

    const fields = [
        { key: "full_name", label: "Full Name", icon: User, type: "text", required: true },
        { key: "email", label: "Email Address", icon: Mail, type: "email", required: true },
        { key: "phone", label: "Phone Number", icon: Phone, type: "tel" },
        { key: "location", label: "Location", icon: MapPin, type: "text" },
        { key: "profession", label: "Profession", icon: BriefcaseBusiness, type: "text" },
        { key: "linkedin", label: "LinkedIn Profile", icon: Link, type: "url" },
        { key: "website", label: "Personal Website", icon: Globe, type: "url" },
    ]

    return (
        <div className="space-y-5">
            <h3 className="text-lg font-semibold text-slate-800">
                Personal Information
            </h3>

            <p className="text-sm text-slate-500">
                Add your personal details to make your resume stand out.
            </p>

            <div className="flex items-center gap-4">
                <label className="cursor-pointer group">
                    {data.image ? (
                        <img
                            src={typeof data.image === 'string' ? data.image : URL.createObjectURL(data.image)}
                            alt="user-image"
                            className="h-24 w-24 rounded-full object-cover border border-slate-300 group-hover:opacity-80 transition"
                        />
                    ) : (
                        <div className="h-24 w-24 rounded-full bg-slate-100 border border-dashed border-slate-300 flex flex-col items-center justify-center text-xs text-slate-500 text-center p-2 group-hover:bg-slate-200 transition">
                            <User className="size-6 mb-1 text-slate-400" />
                            Upload Image
                        </div>
                    )}

                    <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleChange('image', e.target.files[0])}
                    />
                </label>

                {typeof data.image === 'object' && (
                    <div className="flex flex-col gap-2">
                        <p className="text-sm text-slate-600">
                            Remove Background
                        </p>

                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                id="image"
                                className="sr-only peer"
                                onChange={() => setRemoveBackground(prev => !prev)}
                                checked={removeBackground}
                            />

                            <div className="w-10 h-6 bg-slate-300 border border-slate-300 rounded-full peer-checked:bg-blue-500 peer-checked:border-blue-500 transition" />

                            <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm transition peer-checked:translate-x-4" />
                        </label>
                    </div>
                )}
            </div>

            {fields.map((field) => {
                const Icon = field.icon;
                return (
                    <div key={field.key} className="flex items-start gap-3 space-y-1 mt-5">

                        <label className="flex items-center gap-2 min-w-35 text-sm font-medium text-slate-700">
                            <Icon className="size-4 text-slate-400" />
                            <span>
                                {field.label}
                                {field.required && <span className="text-red-500 ml-0.5">*</span>}
                            </span>
                        </label>

                        <input
                            type={field.type}
                            placeholder={`Enter your ${field.label.toLowerCase()}`}
                            value={data[field.key] || ''}
                            onChange={(e) => handleChange(field.key, e.target.value)}
                            className="flex-1 px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                            required={field.required}
                        />

                    </div>
                );
            })}

        </div>
    )
}

export default PersonalInfoForm
