import { Check, Layout } from 'lucide-react';
import React, { useState } from 'react'

const TemplateSelector = ({ selectedTemplate, onChange }) => {

  const [isOpen, setIsOpen] = useState(false);

  const templates = [
    { id: "classic", name: "Classic", preview: "A classic resume template " },
    { id: "modern", name: "Modern", preview: "A modern resume template " },
    { id: "minimal", name: "Minimal", preview: "A minimal resume template " },
    { id: "minimal-image", name: "Minimal Image", preview: "A minimal resume template with image " },
  ]

  return (
    <div className="relative">
      <button
        className="flex items-center gap-2 px-4 py-2 bg-blue-100 border border-blue-400 rounded-lg text-sm text-slate-800 hover:bg-blue-200 hover:border-blue-500 transition"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Layout size={14} />
        <span className="max-sm:hidden font-medium">Template</span>
      </button>

      {isOpen && (
        <div className="absolute left-0 mt-2 w-56 bg-white border border-slate-200 rounded-xl shadow-lg z-10 overflow-hidden">
          {templates.map((template) => (
            <div
              key={template.id}
              className={`px-4 py-3 cursor-pointer transition flex items-start gap-3
          ${selectedTemplate === template.id
                  ? 'bg-slate-100'
                  : 'hover:bg-slate-50'}`}
              onClick={() => {
                onChange(template.id);
                setIsOpen(false);
              }}
            >
              {selectedTemplate === template.id && (
                <div className="flex items-center justify-center mt-1">
                  <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                    <Check size={10} className="text-white" />
                  </div>
                </div>
              )}

              <div className="space-y-0.5">
                <h4 className="text-sm font-medium text-slate-800">
                  {template.name}
                </h4>
                <div className="text-xs text-slate-500">
                  {template.preview}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default TemplateSelector
