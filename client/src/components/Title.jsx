import React from 'react'

const Title = ({ title, description }) => {
    return (
        <div className='text-center mt-12 text-slate-800'>
            <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 tracking-tight text-center">  {title}
            </h2>

            <p className="text-base md:text-lg text-slate-600 mt-3 leading-relaxed max-w-2xl">
                {description}
            </p>
        </div>
    )
}

export default Title
