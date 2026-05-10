
const MinimalTemplate = ({ data, accentColor }) => {
    const formatDate = (dateStr) => {
        if (!dateStr) return "";
        const [year, month] = dateStr.split("-");
        return new Date(year, month - 1).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short"
        });
    };

    return (
        <div className="max-w-4xl mx-auto p-8 bg-white text-gray-900 font-light">
            {/* Header */}
            <header className="mb-8">
                <h1 className="text-4xl font-semibold mb-2 tracking-wide">
                    {data.personal_info?.full_name || "Your Name"}
                </h1>
                <p className="uppercase text-zinc-600 pb-2 font-medium text-sm ">
                    {data?.personal_info?.profession || "Profession"}
                </p>

                <div className="flex flex-wrap gap-5 text-sm text-gray-600">
                    {data.personal_info?.email && <span>{data.personal_info.email}</span>}
                    {data.personal_info?.phone && <span>{data.personal_info.phone}</span>}
                    {data.personal_info?.location && <span>{data.personal_info.location}</span>}
                    {data.personal_info?.linkedin && (
                        <span className="break-all">{data.personal_info.linkedin}</span>
                    )}
                    {data.personal_info?.website && (
                        <span className="break-all">{data.personal_info.website}</span>
                    )}
                </div>
            </header>

            {/* Professional Summary */}
            {data.professional_summary && (
                <section className="mb-6">
                    <h2 className="text-xl uppercase font-semibold mb-2" style={{ color: accentColor }}>
                        SUMMARY
                    </h2>
                    <p className=" text-gray-700">
                        {data.professional_summary}
                    </p>
                </section>
            )}

            {/* Experience */}
            {data.experience && data.experience.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-xl uppercase mb-2 font-semibold" style={{ color: accentColor }}>
                        EXPERIENCE
                    </h2>

                    <div className="space-y-4">
                        {data.experience.map((exp, index) => (
                            <div key={index}>
                                <div className="flex justify-between items-baseline mb-1">
                                    <h3 className="text-lg font-medium">{exp.position}</h3>
                                    <span className="text-sm text-gray-500">
                                        {formatDate(exp.start_date)} - {exp.is_current ? "Present" : formatDate(exp.end_date)}
                                    </span>
                                </div>
                                <p style={{ color: accentColor }} >
                                    {exp.company}</p>
                                {exp.description && (
                                    <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                                        {exp.description}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Projects */}
            {data.project && data.project.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-xl uppercase mb-2 font-semibold" style={{ color: accentColor }}>
                        PROJECTS
                    </h2>

                    <div className="space-y-4">
                        {data.project.map((proj, index) => (
                            <div key={index} className="flex flex-col gap-1 justify-between items-baseline">
                                <h3 className="text-lg font-medium ">{proj.name}</h3>
                                <p className="text-lg" style={{ color: accentColor }} >
                                    {proj.type}
                                </p>
                                <p className="text-gray-600">{proj.description}</p>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Education */}
            {data.education && data.education.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-xl uppercase mb-2 font-semibold" style={{ color: accentColor }}>
                        EDUCATION
                    </h2>

                    <div className="space-y-4">
                        {data.education.map((edu, index) => (
                            <div key={index} className="flex justify-between items-baseline">
                                <div>
                                    <h3 className="font-medium">
                                        {edu.degree} {edu.field && `in ${edu.field}`}
                                    </h3>
                                    <p className="text-gray-600">{edu.institution}</p>
                                    {edu.gpa && <p className="text-sm text-gray-500">GPA: {edu.gpa}</p>}
                                </div>
                                <span className="text-sm text-gray-500">
                                    {formatDate(edu.graduation_date)}
                                </span>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Skills */}
            {data.skills && data.skills.length > 0 && (
                <section>
                    <h2 className="text-xl uppercase mb-2 font-semibold" style={{ color: accentColor }}>
                        SKILLS
                    </h2>

                    <div className="text-gray-700">
                        {data.skills.join(" • ")}
                    </div>
                </section>
            )}
        </div>
    );
}

export default MinimalTemplate;