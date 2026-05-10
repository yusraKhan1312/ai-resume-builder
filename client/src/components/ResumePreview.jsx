import React from 'react'
import ClassicTemplate from './templates/ClassicTemplate'
import ModernTemplate from './templates/ModernTemplate'
import MinimalImageTemplate from './templates/MinimalImageTemplate'
import MinimalTemplate from './templates/MinimalTemplate'

const ResumePreview = ({ data, template, accentColor, classes = "" }) => {

    const renderTemplate = () => {
        switch (template) {
            case "modern":
                return <ModernTemplate data={data} accentColor={accentColor} />
            case "minimal":
                return <MinimalTemplate data={data} accentColor={accentColor} />
            case "minimal-image":
                return <MinimalImageTemplate data={data} accentColor={accentColor} />;
            default:
                return <ClassicTemplate data={data} accentColor={accentColor} />
        }
    }

    return (
        <div className="w-full bg-slate-100 flex justify-center print:bg-white print:p-0">
            <div
                id="resume-preview"
                className={
                    "w-full max-w-4xl bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden print:shadow-none print:border-none print:rounded-none " +
                    classes
                }
            >
                {renderTemplate()}
            </div>
        </div>
    )
}

export default ResumePreview
