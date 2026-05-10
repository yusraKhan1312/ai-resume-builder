import React from 'react'

const CallToAction = () => {
    return (
        <>
            <div id="call-to-action" className="border-y border-dashed border-slate-200 w-full max-w-5xl mx-auto px-16 mt-24 mb-10">
                <div className="flex flex-col md:flex-row text-center md:text-left items-center justify-between gap-8 px-3 md:px-10 border-x border-dashed border-slate-200 py-20 -mt-10 -mb-10 w-full">
                    <p className="text-lg font-medium max-w-md text-slate-950">Build a Powerful, Job-Ready Resume in Minutes with AI by Your Side.</p>
                    <button onClick={() => window.location.href = '/app'} className="flex items-center gap-2 rounded-md py-3 px-5 bg-green-600 hover:bg-green-700 transition text-white">
                        <span>Get Started</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4.5"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                    </button>
                </div>
            </div>
        </>
    )
}

export default CallToAction
