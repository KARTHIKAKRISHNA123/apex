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
            <header className="mb-10">
                <h1 className="text-5xl font-thin mb-4 tracking-wide text-zinc-900 uppercase">
                    {data.personal_info?.full_name || "Your Name"}
                </h1>
                
                {data.personal_info?.profession && (
                    <p className="text-xl font-medium mb-4" style={{ color: accentColor }}>
                        {data.personal_info.profession}
                    </p>
                )}

                <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-600 font-medium">
                    {data.personal_info?.email && <span>{data.personal_info.email}</span>}
                    {data.personal_info?.phone && <span>{data.personal_info.phone}</span>}
                    {data.personal_info?.location && <span>{data.personal_info.location}</span>}
                    {data.personal_info?.linkedin && (
                        <span className="break-all">{data.personal_info.linkedin.replace(/^https?:\/\/(www\.)?/, '')}</span>
                    )}
                    {data.personal_info?.github && (
                        <span className="break-all">{data.personal_info.github.replace(/^https?:\/\/(www\.)?/, '')}</span>
                    )}
                    {data.personal_info?.coding_platform && (
                        <span className="break-all">{data.personal_info.coding_platform.replace(/^https?:\/\/(www\.)?/, '')}</span>
                    )}
                    {data.personal_info?.website && (
                        <span className="break-all">{data.personal_info.website.replace(/^https?:\/\/(www\.)?/, '')}</span>
                    )}
                </div>
            </header>

            {/* Professional Summary */}
            {data.professional_summary && (
                <section className="mb-10">
                    <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                        {data.professional_summary}
                    </p>
                </section>
            )}

            {/* Experience */}
            {data.experience && data.experience.length > 0 && (
                <section className="mb-10">
                    <h2 className="text-sm uppercase tracking-widest mb-6 font-semibold" style={{ color: accentColor }}>
                        Experience
                    </h2>
                    <div className="space-y-6">
                        {data.experience.map((exp, index) => (
                            <div key={index}>
                                <div className="flex justify-between items-baseline mb-1">
                                    <h3 className="text-lg font-semibold text-zinc-900">{exp.position}</h3>
                                    <span className="text-sm text-gray-500 font-medium">
                                        {formatDate(exp.start_date)} - {exp.is_current ? "Present" : formatDate(exp.end_date)}
                                    </span>
                                </div>
                                <p className="text-gray-600 mb-2 font-medium">{exp.company}</p>
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

            {/* Internships */}
            {data.internships && data.internships.length > 0 && (
                <section className="mb-10">
                    <h2 className="text-sm uppercase tracking-widest mb-6 font-semibold" style={{ color: accentColor }}>
                        Internships
                    </h2>
                    <div className="space-y-6">
                        {data.internships.map((intern, index) => (
                            <div key={index}>
                                <div className="flex justify-between items-baseline mb-1">
                                    <h3 className="text-lg font-semibold text-zinc-900">{intern.role}</h3>
                                    <span className="text-sm text-gray-500 font-medium">{intern.duration}</span>
                                </div>
                                <p className="text-gray-600 mb-2 font-medium">{intern.company}</p>
                                {intern.description && (
                                    <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                                        {intern.description}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Projects */}
            {data.projects && data.projects.length > 0 && (
                <section className="mb-10">
                    <h2 className="text-sm uppercase tracking-widest mb-6 font-semibold" style={{ color: accentColor }}>
                        Projects
                    </h2>
                    <div className="space-y-6">
                        {data.projects.map((proj, index) => (
                            <div key={index}>
                                <div className="flex justify-between items-baseline mb-1">
                                    <h3 className="text-lg font-semibold text-zinc-900">{proj.name}</h3>
                                    {proj.link && <span className="text-sm text-gray-500">{proj.link.replace(/^https?:\/\/(www\.)?/, '')}</span>}
                                </div>
                                {proj.type && <p className="text-sm text-gray-500 mb-2">{proj.type}</p>}
                                <p className="text-gray-700 whitespace-pre-line">{proj.description}</p>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Hackathons */}
            {data.hackathons && data.hackathons.length > 0 && (
                <section className="mb-10">
                    <h2 className="text-sm uppercase tracking-widest mb-6 font-semibold" style={{ color: accentColor }}>
                        Hackathons
                    </h2>
                    <div className="space-y-5">
                        {data.hackathons.map((hack, index) => (
                            <div key={index}>
                                <div className="flex justify-between items-baseline mb-1">
                                    <h3 className="text-lg font-semibold text-zinc-900">{hack.name}</h3>
                                    <span className="text-sm text-gray-500 font-medium">{formatDate(hack.date)}</span>
                                </div>
                                {hack.achievement && <p className="text-sm font-medium text-gray-600 mb-1">{hack.achievement}</p>}
                                <p className="text-gray-700 whitespace-pre-line">{hack.description}</p>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Leadership & Extracurriculars */}
            {data.leadership && data.leadership.length > 0 && (
                <section className="mb-10">
                    <h2 className="text-sm uppercase tracking-widest mb-6 font-semibold" style={{ color: accentColor }}>
                        Leadership
                    </h2>
                    <div className="space-y-5">
                        {data.leadership.map((item, index) => (
                            <div key={index}>
                                <div className="flex justify-between items-baseline mb-1">
                                    <h3 className="text-lg font-semibold text-zinc-900">{item.role}</h3>
                                    <span className="text-sm text-gray-500 font-medium">{item.date}</span>
                                </div>
                                {item.organization && <p className="text-sm font-medium text-gray-600 mb-1">{item.organization}</p>}
                                <p className="text-gray-700 whitespace-pre-line">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Education & Skills (Grid) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                {data.education && data.education.length > 0 && (
                    <section>
                        <h2 className="text-sm uppercase tracking-widest mb-6 font-semibold" style={{ color: accentColor }}>
                            Education
                        </h2>
                        <div className="space-y-4">
                            {data.education.map((edu, index) => (
                                <div key={index}>
                                    <h3 className="font-semibold text-zinc-900">
                                        {edu.degree} {edu.field && `in ${edu.field}`}
                                    </h3>
                                    <p className="text-gray-600">{edu.institution}</p>
                                    <div className="flex gap-3 text-sm text-gray-500 mt-1">
                                        <span>{formatDate(edu.graduation_date)}</span>
                                        {edu.gpa && <span>• GPA: {edu.gpa}</span>}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {data.skills && data.skills.length > 0 && (
                    <section>
                        <h2 className="text-sm uppercase tracking-widest mb-6 font-semibold" style={{ color: accentColor }}>
                            Skills
                        </h2>
                        <div className="text-gray-700 leading-relaxed">
                            {data.skills.join(" • ")}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
}

export default MinimalTemplate;