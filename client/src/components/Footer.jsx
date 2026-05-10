import React from 'react'

const Footer = () => {
    return (
        <>
            <footer className="w-full bg-gradient-to-r from-white via-green-100 to-white text-slate-800 mt-22">
                <div className="max-w-7xl mx-auto px-6 py-14 flex flex-col items-center">
                    <div className="flex items-center space-x-3 mb-6">
                        <img src='/logo.svg' alt="Logo" className="h-16 w-auto " />
                    </div>

                    <p className="text-center max-w-xl text-sm font-normal leading-relaxed text-slate-600">
                       Build smarter resumes with AI and take the next step in your career with confidence. Designed to help you stand out and get hired faster."
                    </p>
                </div>

                <div className="border-t border-slate-200">
                    <div className="max-w-7xl mx-auto px-6 py-6 text-center text-sm font-normal text-slate-500">
                         © 2025. All rights reserved.
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer
