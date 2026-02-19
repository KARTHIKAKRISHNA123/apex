import { Mail, Phone, MapPin, Linkedin, Globe, Github, Code } from "lucide-react";

const MinimalImageTemplate = ({ data, accentColor }) => {
    const formatDate = (dateStr) => {
        if (!dateStr) return "";
        const [year, month] = dateStr.split("-");
        return new Date(year, month - 1).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
        });
    };

    return (
        <div className="max-w-5xl mx-auto bg-white text-zinc-800 pb-8">
            <div className="grid grid-cols-3">

                <div className="col-span-1 py-10">
                    {/* Image */}
                    {data.personal_info?.image && typeof data.personal_info.image === 'string' ? (
                        <div className="mb-6">
                            <img src={data.personal_info.image} alt="Profile" className="w-32 h-32 object-cover rounded-full mx-auto" style={{ background: accentColor+'70' }} />
                        </div>
                    ) : (
                        data.personal_info?.image && typeof data.personal_info.image === 'object' ? (
                            <div className="mb-6">
                                <img src={URL.createObjectURL(data.personal_info.image)} alt="Profile" className="w-32 h-32 object-cover rounded-full mx-auto" />
                            </div>
                        ) : null
                    )}
                </div>

                {/* Name + Title */}
                <div className="col-span-2 flex flex-col justify-center py-10 px-8">
                    <h1 className="text-4xl font-bold text-zinc-700 tracking-widest uppercase">
                        {data.personal_info?.full_name || "Your Name"}
                    </h1>
                    <p className="uppercase text-zinc-500 font-medium text-sm tracking-widest mt-1" style={{ color: accentColor }}>
                        {data?.personal_info?.profession || "Profession"}
                    </p>
                </div>

                {/* Left Sidebar */}
                <aside className="col-span-1 border-r border-zinc-200 p-6 pt-0">

                    {/* Contact */}
                    <section className="mb-8">
                        <h2 className="text-xs font-semibold tracking-widest text-zinc-800 mb-4 border-b pb-1" style={{ borderColor: accentColor }}>
                            CONTACT
                        </h2>
                        <div className="space-y-3 text-sm text-zinc-600">
                            {data.personal_info?.phone && (
                                <div className="flex items-center gap-3">
                                    <Phone size={14} style={{ color: accentColor }} className="shrink-0" />
                                    <span className="break-all">{data.personal_info.phone}</span>
                                </div>
                            )}
                            {data.personal_info?.email && (
                                <div className="flex items-center gap-3">
                                    <Mail size={14} style={{ color: accentColor }} className="shrink-0" />
                                    <span className="break-all">{data.personal_info.email}</span>
                                </div>
                            )}
                            {data.personal_info?.location && (
                                <div className="flex items-center gap-3">
                                    <MapPin size={14} style={{ color: accentColor }} className="shrink-0" />
                                    <span className="break-all">{data.personal_info.location}</span>
                                </div>
                            )}
                            {data.personal_info?.linkedin && (
                                <div className="flex items-center gap-3">
                                    <Linkedin size={14} style={{ color: accentColor }} className="shrink-0" />
                                    <span className="break-all">{data.personal_info.linkedin.replace(/^https?:\/\/(www\.)?/, '')}</span>
                                </div>
                            )}
                            {data.personal_info?.github && (
                                <div className="flex items-center gap-3">
                                    <Github size={14} style={{ color: accentColor }} className="shrink-0" />
                                    <span className="break-all">{data.personal_info.github.replace(/^https?:\/\/(www\.)?/, '')}</span>
                                </div>
                            )}
                            {data.personal_info?.coding_platform && (
                                <div className="flex items-center gap-3">
                                    <Code size={14} style={{ color: accentColor }} className="shrink-0" />
                                    <span className="break-all">{data.personal_info.coding_platform.replace(/^https?:\/\/(www\.)?/, '')}</span>
                                </div>
                            )}
                            {data.personal_info?.website && (
                                <div className="flex items-center gap-3">
                                    <Globe size={14} style={{ color: accentColor }} className="shrink-0" />
                                    <span className="break-all">{data.personal_info.website.replace(/^https?:\/\/(www\.)?/, '')}</span>
                                </div>
                            )}
                        </div>
                    </section>

                    {/* Education */}
                    {data.education && data.education.length > 0 && (
                        <section className="mb-8">
                            <h2 className="text-xs font-semibold tracking-widest text-zinc-800 mb-4 border-b pb-1" style={{ borderColor: accentColor }}>
                                EDUCATION
                            </h2>
                            <div className="space-y-4 text-sm">
                                {data.education.map((edu, index) => (
                                    <div key={index}>
                                        <p className="font-bold text-zinc-800">{edu.degree}</p>
                                        <p className="text-zinc-600">{edu.institution}</p>
                                        <p className="text-xs text-zinc-500 mt-1">
                                            {formatDate(edu.graduation_date)}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Skills */}
                    {data.skills && data.skills.length > 0 && (
                        <section className="mb-8 pb-4">
                            <h2 className="text-xs font-semibold tracking-widest text-zinc-800 mb-4 border-b pb-1" style={{ borderColor: accentColor }}>
                                SKILLS
                            </h2>
                            <ul className="space-y-1.5 text-sm text-zinc-600">
                                {data.skills.map((skill, index) => (
                                    <li key={index}>• {skill}</li>
                                ))}
                            </ul>
                        </section>
                    )}

                    {/* Certifications */}
                    {data.certifications && data.certifications.length > 0 && (
                        <section>
                            <h2 className="text-xs font-semibold tracking-widest text-zinc-800 mb-4 border-b pb-1" style={{ borderColor: accentColor }}>
                                CERTIFICATIONS
                            </h2>
                            <div className="space-y-3 text-sm">
                                {data.certifications.map((cert, index) => (
                                    <div key={index}>
                                        <p className="font-bold text-zinc-800">{cert.name}</p>
                                        <p className="text-zinc-600 text-xs">{cert.issuer}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </aside>

                {/* Right Content */}
                <main className="col-span-2 p-8 pt-0">

                    {/* Summary */}
                    {data.professional_summary && (
                        <section className="mb-8">
                            <h2 className="text-xs font-semibold tracking-widest mb-3 border-b pb-1" style={{ borderColor: accentColor, color: accentColor }} >
                                SUMMARY
                            </h2>
                            <p className="text-zinc-700 leading-relaxed text-sm whitespace-pre-line">
                                {data.professional_summary}
                            </p>
                        </section>
                    )}

                    {/* Experience */}
                    {data.experience && data.experience.length > 0 && (
                        <section className="mb-8">
                            <h2 className="text-xs font-semibold tracking-widest mb-4 border-b pb-1" style={{ borderColor: accentColor, color: accentColor }} >
                                EXPERIENCE
                            </h2>
                            <div className="space-y-6">
                                {data.experience.map((exp, index) => (
                                    <div key={index}>
                                        <div className="flex justify-between items-baseline">
                                            <h3 className="font-bold text-zinc-900">
                                                {exp.position}
                                            </h3>
                                            <span className="text-xs font-medium text-zinc-500">
                                                {formatDate(exp.start_date)} - {exp.is_current ? "Present" : formatDate(exp.end_date)}
                                            </span>
                                        </div>
                                        <p className="text-sm font-semibold mb-2 text-zinc-600">
                                            {exp.company}
                                        </p>
                                        {exp.description && (
                                            <p className="text-sm text-zinc-700 leading-relaxed whitespace-pre-line">
                                                {exp.description}
                                            </p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Internships */}
                    {data.internships && data.internships.length > 0 && (
                        <section className="mb-8">
                            <h2 className="text-xs font-semibold tracking-widest mb-4 border-b pb-1" style={{ borderColor: accentColor, color: accentColor }} >
                                INTERNSHIPS
                            </h2>
                            <div className="space-y-6">
                                {data.internships.map((intern, index) => (
                                    <div key={index}>
                                        <div className="flex justify-between items-baseline">
                                            <h3 className="font-bold text-zinc-900">{intern.role}</h3>
                                            <span className="text-xs font-medium text-zinc-500">{intern.duration}</span>
                                        </div>
                                        <p className="text-sm font-semibold mb-2 text-zinc-600">{intern.company}</p>
                                        {intern.description && (
                                            <p className="text-sm text-zinc-700 leading-relaxed whitespace-pre-line">{intern.description}</p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Projects */}
                    {data.projects && data.projects.length > 0 && (
                        <section className="mb-8">
                            <h2 className="text-xs uppercase tracking-widest font-semibold border-b pb-1 mb-4" style={{ borderColor: accentColor, color: accentColor }}>
                                PROJECTS
                            </h2>
                            <div className="space-y-5">
                                {data.projects.map((project, index) => (
                                    <div key={index}>
                                        <div className="flex justify-between items-baseline">
                                            <h3 className="text-md font-bold text-zinc-900">{project.name}</h3>
                                            {project.link && (
                                                <a href={project.link} target="_blank" rel="noreferrer" className="text-xs text-blue-600 hover:underline">
                                                    {project.link.replace(/^https?:\/\/(www\.)?/, '')}
                                                </a>
                                            )}
                                        </div>
                                        {project.type && <p className="text-xs font-medium text-zinc-500 mb-1">{project.type}</p>}
                                        {project.description && (
                                            <p className="text-sm text-zinc-700 leading-relaxed whitespace-pre-line mt-1">{project.description}</p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Hackathons */}
                    {data.hackathons && data.hackathons.length > 0 && (
                        <section>
                            <h2 className="text-xs uppercase tracking-widest font-semibold border-b pb-1 mb-4" style={{ borderColor: accentColor, color: accentColor }}>
                                HACKATHONS
                            </h2>
                            <div className="space-y-4">
                                {data.hackathons.map((hack, index) => (
                                    <div key={index}>
                                        <div className="flex justify-between items-baseline">
                                            <h3 className="text-md font-bold text-zinc-900">{hack.name}</h3>
                                            <span className="text-xs text-zinc-500">{formatDate(hack.date)}</span>
                                        </div>
                                        {hack.achievement && <p className="text-xs font-bold mt-0.5" style={{ color: accentColor }}>{hack.achievement}</p>}
                                        {hack.description && <p className="text-sm text-zinc-700 leading-relaxed whitespace-pre-line mt-1">{hack.description}</p>}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                    {/* Leadership & Extracurriculars */}
                    {data.leadership && data.leadership.length > 0 && (
                        <section>
                            <h2 className="text-xs uppercase tracking-widest font-semibold border-b pb-1 mb-4" style={{ borderColor: accentColor, color: accentColor }}>
                                LEADERSHIP
                            </h2>
                            <div className="space-y-4">
                                {data.leadership.map((item, index) => (
                                    <div key={index}>
                                        <div className="flex justify-between items-baseline">
                                            <h3 className="text-md font-bold text-zinc-900">{item.role}</h3>
                                            <span className="text-xs text-zinc-500">{item.date}</span>
                                        </div>
                                        {item.organization && <p className="text-xs font-bold mt-0.5" style={{ color: accentColor }}>{item.organization}</p>}
                                        {item.description && <p className="text-sm text-zinc-700 leading-relaxed whitespace-pre-line mt-1">{item.description}</p>}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </main>
            </div>
        </div>
    );
}

export default MinimalImageTemplate;