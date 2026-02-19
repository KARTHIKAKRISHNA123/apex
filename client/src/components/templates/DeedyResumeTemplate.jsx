import React from 'react';

const DeedyTemplate = React.forwardRef(({ data }, ref) => {
  const p = data?.personal_info || {};
  const accent = data?.accent_color || '#333333';

  const formatName = (fullName) => {
    if (!fullName) return { first: 'Your', last: 'Name' };
    const parts = fullName.split(' ');
    const last = parts.length > 1 ? parts.pop() : '';
    const first = parts.join(' ');
    return { first, last };
  };

  const nameParts = formatName(p.full_name);

  return (
    <div ref={ref} className="w-full h-full bg-white text-[#333] font-sans overflow-hidden flex leading-relaxed" style={{ minHeight: '297mm', fontFamily: "'Open Sans', 'Lato', sans-serif" }}>
      
      {/* --- LEFT COLUMN (35%) --- */}
      <div className="w-[35%] h-full p-8 pr-6 border-r border-gray-200 flex flex-col overflow-hidden">
        
        {/* Contact info pushed to top, no photo */}
        <section className="mb-8 mt-4">
          <div className="text-xs text-gray-500 space-y-1.5 font-medium flex flex-col break-all">
            {p.email && <span className="text-[#333] font-bold">{p.email}</span>}
            {p.phone && <span>{p.phone}</span>}
            {/* Links are now standard color, but still fully clickable */}
            {p.github && <a href={p.github} target="_blank" rel="noreferrer" className="hover:underline">{p.github.replace(/^https?:\/\/(www\.)?/, '')}</a>}
            {p.linkedin && <a href={p.linkedin} target="_blank" rel="noreferrer" className="hover:underline">{p.linkedin.replace(/^https?:\/\/(www\.)?/, '')}</a>}
            {p.coding_platform && <a href={p.coding_platform} target="_blank" rel="noreferrer" className="hover:underline">{p.coding_platform.replace(/^https?:\/\/(www\.)?/, '')}</a>}
            {p.website && <a href={p.website} target="_blank" rel="noreferrer" className="hover:underline">{p.website.replace(/^https?:\/\/(www\.)?/, '')}</a>}
            {p.location && <span className="pt-1">{p.location}</span>}
          </div>
        </section>

        {data?.education?.length > 0 && (
          <section className="mb-8 flex-shrink-0">
            <h2 className="text-xs font-bold uppercase tracking-[0.15em] text-gray-400 mb-3 border-b border-gray-200 pb-1">Education</h2>
            <div className="space-y-4">
              {data.education.map((edu, i) => (
                <div key={i}>
                  <h3 className="text-sm font-bold text-[#333]">{edu.institution}</h3>
                  <p className="text-xs font-semibold mt-0.5" style={{ color: accent }}>{edu.degree} {edu.field && `in ${edu.field}`}</p>
                  <p className="text-xs text-gray-500 mt-1">{edu.graduation_date}</p>
                  {edu.gpa && <p className="text-xs text-gray-500 mt-0.5">GPA: {edu.gpa}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        {data?.skills?.length > 0 && (
          <section className="mb-8 pb-6 flex-shrink-0">
            <h2 className="text-xs font-bold uppercase tracking-[0.15em] text-gray-400 mb-3 border-b border-gray-200 pb-1">Skills</h2>
            <div className="text-xs text-gray-600 leading-relaxed font-semibold flex flex-wrap gap-x-1 gap-y-1">
              {data.skills.map((skill, i) => {
                if (!skill.trim()) return null;
                return <span key={i}>{skill}{i < data.skills.length - 1 ? <span className="text-gray-300 mx-1">•</span> : ''}</span>
              })}
            </div>
          </section>
        )}

        {data?.certifications?.length > 0 && (
          <section className="mb-8 flex-shrink-0">
            <h2 className="text-xs font-bold uppercase tracking-[0.15em] text-gray-400 mb-3 border-b border-gray-200 pb-1">Certifications</h2>
            <div className="space-y-3">
              {data.certifications.map((cert, i) => (
                <div key={i}>
                  <h3 className="text-xs font-bold text-[#333]">{cert.name}</h3>
                  <p className="text-[11px] text-gray-500 mt-0.5">{cert.issuer}</p>
                  <p className="text-[10px] text-gray-400">{cert.date}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* --- RIGHT COLUMN (65%) --- */}
      <div className="w-[65%] h-full p-8 pl-6">
        
        <header className="mb-6">
          <h1 className="text-5xl tracking-tight text-[#333] leading-none mb-2 uppercase break-words">
            <span className="font-light">{nameParts.first}</span> <span className="font-bold">{nameParts.last}</span>
          </h1>
          <p className="text-sm font-semibold tracking-widest uppercase" style={{ color: accent }}>
            {p.profession || "Target Role"}
          </p>
        </header>

        {data?.professional_summary && (
          <section className="mb-6">
            <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
              {data.professional_summary}
            </p>
          </section>
        )}

        {data?.experience?.length > 0 && (
          <section className="mb-6">
            <h2 className="text-xs font-bold uppercase tracking-[0.15em] text-gray-400 mb-3 border-b border-gray-200 pb-1">Experience</h2>
            <div className="space-y-5">
              {data.experience.map((exp, i) => (
                <div key={i}>
                  <div className="flex justify-between items-baseline mb-0.5">
                    <h3 className="text-sm font-bold text-[#333]">{exp.company}</h3>
                    <span className="text-xs text-gray-500 font-medium">
                      {exp.start_date} — {exp.is_current ? "Present" : exp.end_date}
                    </span>
                  </div>
                  <div className="text-xs font-semibold mb-2" style={{ color: accent }}>{exp.position}</div>
                  <p className="text-xs text-gray-700 leading-relaxed whitespace-pre-line">
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {data?.internships?.length > 0 && (
          <section className="mb-6">
            <h2 className="text-xs font-bold uppercase tracking-[0.15em] text-gray-400 mb-3 border-b border-gray-200 pb-1">Internships</h2>
            <div className="space-y-5">
              {data.internships.map((intern, i) => (
                <div key={i}>
                  <div className="flex justify-between items-baseline mb-0.5">
                    <h3 className="text-sm font-bold text-[#333]">{intern.company}</h3>
                    <span className="text-xs text-gray-500 font-medium">{intern.duration}</span>
                  </div>
                  <div className="text-xs font-semibold mb-2" style={{ color: accent }}>{intern.role}</div>
                  <p className="text-xs text-gray-700 leading-relaxed whitespace-pre-line">
                    {intern.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {data?.projects?.length > 0 && (
          <section className="mb-6">
            <h2 className="text-xs font-bold uppercase tracking-[0.15em] text-gray-400 mb-3 border-b border-gray-200 pb-1">Projects</h2>
            <div className="space-y-4">
              {data.projects.map((proj, i) => (
                <div key={i}>
                  <div className="flex justify-between items-baseline mb-0.5">
                    <h3 className="text-sm font-bold text-[#333]">
                      {/* Removed the blue link styling, integrated it into the title or beside it */}
                      {proj.name} {proj.link && <a href={proj.link} target="_blank" rel="noreferrer" className="text-gray-500 font-normal ml-2 hover:underline">| Link</a>}
                    </h3>
                  </div>
                  <div className="text-[11px] font-semibold mb-1" style={{ color: accent }}>{proj.type}</div>
                  <p className="text-xs text-gray-700 leading-relaxed whitespace-pre-line">
                    {proj.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {data?.hackathons?.length > 0 && (
          <section className="mb-6">
            <h2 className="text-xs font-bold uppercase tracking-[0.15em] text-gray-400 mb-3 border-b border-gray-200 pb-1">Hackathons</h2>
            <div className="space-y-4">
              {data.hackathons.map((hack, i) => (
                <div key={i}>
                  <div className="flex justify-between items-baseline mb-0.5">
                    <h3 className="text-sm font-bold text-[#333]">{hack.name}</h3>
                    <span className="text-xs text-gray-500 font-medium">{hack.date}</span>
                  </div>
                  <div className="text-xs font-semibold mb-1" style={{ color: accent }}>{hack.achievement}</div>
                  <p className="text-xs text-gray-700 leading-relaxed whitespace-pre-line">
                    {hack.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {data?.leadership?.length > 0 && (
          <section className="mb-6">
            <h2 className="text-xs font-bold uppercase tracking-[0.15em] text-gray-400 mb-3 border-b border-gray-200 pb-1">Positions of Responsibility</h2>
            <div className="space-y-4">
              {data.leadership.map((item, i) => (
                <div key={i}>
                  <div className="flex justify-between items-baseline mb-0.5">
                    <h3 className="text-sm font-bold text-[#333]">{item.role}</h3>
                    <span className="text-xs text-gray-500 font-medium">{item.date}</span>
                  </div>
                  <div className="text-xs font-semibold mb-1" style={{ color: accent }}>{item.organization}</div>
                  <p className="text-xs text-gray-700 leading-relaxed whitespace-pre-line">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

      </div>
    </div>
  );
});

export default DeedyTemplate;