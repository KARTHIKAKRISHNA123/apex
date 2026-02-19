import React from 'react';
import { Mail, Phone, Linkedin, Globe, Github, Code } from "lucide-react"; // MapPin removed

const ClassicTemplate = ({ data }) => {
    // Helper to safely format dates
    const formatDate = (dateStr) => {
        if (!dateStr) return "";
        const [year, month] = dateStr.split("-");
        return new Date(year, month - 1).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short"
        });
    };

    // LaTeX Section Title Component
    const SectionTitle = ({ title }) => (
        <h2 className="text-[12pt] font-bold uppercase tracking-widest text-black mb-1.5 pb-0.5 border-b-2 border-black">
            {title}
        </h2>
    );

    // Separator component invisible to ATS
    const Separator = () => <span aria-hidden="true" className="text-black select-none px-1 last:hidden">•</span>;

    return (
        // LaTeX resumes use serif fonts (Times New Roman), pure black text, and tight line heights
        <div className="max-w-4xl mx-auto p-6 bg-white text-black font-serif leading-tight">

            {/* --- HEADER --- */}
            <header className="flex flex-col items-center mb-4 text-center">
                <h1 className="text-[22pt] font-serif font-bold mb-0.5 tracking-normal text-black text-center uppercase">
                    {data.personal_info?.full_name || "Your Name"}
                </h1>

                {/* --- PROFESSION TITLE --- */}
                <p className="text-[11pt] text-gray-800 font-medium mb-1.5">
                    {data.personal_info?.profession || "Junior First-Time Developer"}
                </p>

                {/* --- CONTACT INFO (ATS OPTIMIZED, LOCATION REMOVED FOR 1-LINE FIT) --- */}
                <div className="flex flex-wrap justify-center items-center gap-1.5 text-[9.5pt] text-black mb-1 [&>span:last-child]:hidden">
                    {data.personal_info?.phone && (
                        <>
                            <a href={`tel:${data.personal_info.phone}`} className="flex items-center gap-1 hover:underline">
                                <Phone className="size-3 shrink-0" aria-hidden="true" />
                                <span>{data.personal_info.phone}</span>
                            </a>
                            <Separator />
                        </>
                    )}
                    {data.personal_info?.email && (
                        <>
                            <a href={`mailto:${data.personal_info.email}`} className="flex items-center gap-1 hover:underline">
                                <Mail className="size-3 shrink-0" aria-hidden="true" />
                                <span>{data.personal_info.email}</span>
                            </a>
                            <Separator />
                        </>
                    )}
                    {data.personal_info?.linkedin && (
                        <>
                            <a href={data.personal_info.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:underline">
                                <Linkedin className="size-3 shrink-0" aria-hidden="true" />
                                <span>{data.personal_info.linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, '').replace(/^https?:\/\/(www\.)?/, '')}</span>
                            </a>
                            <Separator />
                        </>
                    )}
                    {data.personal_info?.github && (
                        <>
                            <a href={data.personal_info.github} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:underline">
                                <Github className="size-3 shrink-0" aria-hidden="true" />
                                <span>{data.personal_info.github.replace(/^https?:\/\/(www\.)?github\.com\//, '').replace(/^https?:\/\/(www\.)?/, '')}</span>
                            </a>
                            <Separator />
                        </>
                    )}
                    {data.personal_info?.coding_platform && (
                        <>
                            <a href={data.personal_info.coding_platform} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:underline">
                                <Code className="size-3 shrink-0" aria-hidden="true" />
                                <span>{data.personal_info.coding_platform.replace(/^https?:\/\/(www\.)?/, '')}</span>
                            </a>
                            <Separator />
                        </>
                    )}
                    {data.personal_info?.website && (
                        <>
                            <a href={data.personal_info.website} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:underline">
                                <Globe className="size-3 shrink-0" aria-hidden="true" />
                                <span>{data.personal_info.website.replace(/^https?:\/\/(www\.)?/, '')}</span>
                            </a>
                            <Separator />
                        </>
                    )}
                </div>
            </header>

            {/* --- PROFESSIONAL SUMMARY --- */}
            {data.professional_summary && (
                <section className="mb-4">
                    <SectionTitle title="Summary" />
                    <p className="text-[10.5pt] leading-snug whitespace-pre-line text-justify mt-1.5">
                        {data.professional_summary}
                    </p>
                </section>
            )}

            {/* --- EDUCATION --- */}
            {data.education && data.education.length > 0 && (
                <section className="mb-4">
                    <SectionTitle title="Education" />
                    <ul className="list-none space-y-2 mt-1.5 m-0 p-0">
                        {data.education.map((edu, index) => (
                            <li key={index}>
                                <div className="flex justify-between items-baseline">
                                    <h3 className="font-bold text-[11pt]">{edu.institution}</h3>
                                    <span className="italic text-[10.5pt]">{formatDate(edu.graduation_date)}</span>
                                </div>
                                <div className="flex justify-between items-baseline mt-0.5">
                                    <p className="italic text-[10.5pt]">
                                        {edu.degree} {edu.field && `in ${edu.field}`}
                                        {edu.gpa && <span className="font-normal"> — CGPA: {edu.gpa}</span>}
                                    </p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </section>
            )}

            {/* --- EXPERIENCE --- */}
            {data.experience && data.experience.length > 0 && (
                <section className="mb-4">
                    <SectionTitle title="Experience" />
                    <ul className="list-none space-y-3 mt-1.5 m-0 p-0">
                        {data.experience.map((exp, index) => (
                            <li key={index}>
                                <div className="flex justify-between items-baseline">
                                    <h3 className="font-bold text-[11pt]">{exp.company}</h3>
                                    <span className="italic text-[10.5pt]">{formatDate(exp.start_date)} - {exp.is_current ? "Present" : formatDate(exp.end_date)}</span>
                                </div>
                                <div className="flex justify-between items-baseline mt-0.5 mb-1">
                                    <p className="italic text-[10.5pt]">{exp.position}</p>
                                </div>
                                {exp.description && (
                                    <ul className="list-disc pl-5 text-[10pt] space-y-0.5 mt-1 marker:text-black">
                                        {exp.description.split('\n').filter(line => line.trim() !== '').map((line, i) => (
                                            <li key={i} className="pl-1 leading-snug">{line}</li>
                                        ))}
                                    </ul>
                                )}
                            </li>
                        ))}
                    </ul>
                </section>
            )}

            {/* --- INTERNSHIPS --- */}
            {data.internships && data.internships.length > 0 && (
                <section className="mb-4">
                    <SectionTitle title="Internship Experience" />
                    <ul className="list-none space-y-3 mt-1.5 m-0 p-0">
                        {data.internships.map((intern, index) => (
                            <li key={index}>
                                <div className="flex justify-between items-baseline">
                                    <h3 className="font-bold text-[11pt]">{intern.company}</h3>
                                    <span className="italic text-[10.5pt]">{intern.duration}</span>
                                </div>
                                <div className="flex justify-between items-baseline mt-0.5 mb-1">
                                    <p className="italic text-[10.5pt]">{intern.role}</p>
                                </div>
                                {intern.description && (
                                    <ul className="list-disc pl-5 text-[10pt] space-y-0.5 mt-1 marker:text-black">
                                        {intern.description.split('\n').filter(line => line.trim() !== '').map((line, i) => (
                                            <li key={i} className="pl-1 leading-snug">{line}</li>
                                        ))}
                                    </ul>
                                )}
                            </li>
                        ))}
                    </ul>
                </section>
            )}

            {/* --- PROJECTS --- */}
            {data.projects && data.projects.length > 0 && (
                <section className="mb-4">
                    <SectionTitle title="Projects" />
                    <ul className="list-none space-y-3 mt-1.5 m-0 p-0">
                        {data.projects.map((proj, index) => (
                            <li key={index}>
                                <div className="flex justify-between items-baseline">
                                    <div className="text-[11pt]">
                                        <span className="font-bold">{proj.name}</span>
                                        {proj.type && <span className="italic"> | {proj.type}</span>}
                                        {proj.link && <span> | <a href={proj.link} target="_blank" rel="noreferrer" className="underline">{proj.link.replace(/^https?:\/\/(www\.)?/, '')}</a></span>}
                                    </div>
                                    {/* Optional Project Date if you add it to the state later */}
                                    {proj.date && <span className="italic text-[10.5pt]">{proj.date}</span>}
                                </div>
                                {proj.description && (
                                    <ul className="list-disc pl-5 text-[10pt] space-y-0.5 mt-1 marker:text-black">
                                        {proj.description.split('\n').filter(line => line.trim() !== '').map((line, i) => (
                                            <li key={i} className="pl-1 leading-snug">{line}</li>
                                        ))}
                                    </ul>
                                )}
                            </li>
                        ))}
                    </ul>
                </section>
            )}

            {/* --- HACKATHONS --- */}
            {data.hackathons && data.hackathons.length > 0 && (
                <section className="mb-4">
                    <SectionTitle title="Hackathons & Achievements" />
                    <ul className="list-none space-y-2 mt-1.5 m-0 p-0">
                        {data.hackathons.map((hack, index) => (
                            <li key={index}>
                                <div className="flex justify-between items-baseline text-[11pt]">
                                    <div>
                                        <span className="font-bold">{hack.name}</span>
                                        {hack.achievement && <span className="italic font-normal"> | {hack.achievement}</span>}
                                    </div>
                                    <span className="italic text-[10.5pt]">{formatDate(hack.date)}</span>
                                </div>
                                {hack.description && (
                                    <ul className="list-disc pl-5 text-[10pt] space-y-0.5 mt-1 marker:text-black">
                                        {hack.description.split('\n').filter(line => line.trim() !== '').map((line, i) => (
                                            <li key={i} className="pl-1 leading-snug">{line}</li>
                                        ))}
                                    </ul>
                                )}
                            </li>
                        ))}
                    </ul>
                </section>
            )}

            {/* --- LEADERSHIP & EXTRACURRICULAR --- */}
            {data.leadership && data.leadership.length > 0 && (
                <section className="mb-4">
                    <SectionTitle title="Positions of Responsibility" />
                    <ul className="list-none space-y-3 mt-1.5 m-0 p-0">
                        {data.leadership.map((item, index) => (
                            <li key={index}>
                                <div className="flex justify-between items-baseline">
                                    <h3 className="font-bold text-[11pt]">{item.organization || item.role}</h3>
                                    <span className="italic text-[10.5pt]">{item.date}</span>
                                </div>
                                <div className="flex justify-between items-baseline mt-0.5 mb-1">
                                    <p className="italic text-[10.5pt]">{item.organization ? item.role : ''}</p>
                                </div>
                                {item.description && (
                                    <ul className="list-disc pl-5 text-[10pt] space-y-0.5 mt-1 marker:text-black">
                                        {item.description.split('\n').filter(line => line.trim() !== '').map((line, i) => (
                                            <li key={i} className="pl-1 leading-snug">{line}</li>
                                        ))}
                                    </ul>
                                )}
                            </li>
                        ))}
                    </ul>
                </section>
            )}

            {/* --- CERTIFICATIONS --- */}
            {data.certifications && data.certifications.length > 0 && (
                <section className="mb-4">
                    <SectionTitle title="Certifications" />
                    <ul className="list-none space-y-1 mt-1.5 m-0 p-0">
                        {data.certifications.map((cert, index) => (
                            <li key={index} className="text-[10.5pt]">
                                <span className="font-bold">{cert.name}</span>
                                {cert.issuer && <span> — {cert.issuer}</span>}
                                {cert.date && <span className="italic"> ({formatDate(cert.date)})</span>}
                            </li>
                        ))}
                    </ul>
                </section>
            )}

            {/* --- SKILLS --- */}
            {data.skills && data.skills.length > 0 && (
                <section className="mb-4">
                    <SectionTitle title="Skills" />
                    <div className="text-[10.5pt] mt-1.5">
                        <span className="font-bold">Core Technologies: </span>
                        <span>{data.skills.join(', ')}</span>
                    </div>
                </section>
            )}

        </div>
    );
}

export default ClassicTemplate;