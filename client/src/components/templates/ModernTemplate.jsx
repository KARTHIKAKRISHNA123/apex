import { Mail, Phone, MapPin, Linkedin, Globe, Github, Code } from "lucide-react";

const ModernTemplate = ({ data, accentColor }) => {
	const formatDate = (dateStr) => {
		if (!dateStr) return "";
		const [year, month] = dateStr.split("-");
		return new Date(year, month - 1).toLocaleDateString("en-US", {
			year: "numeric",
			month: "short"
		});
	};

	return (
		<div className="max-w-4xl mx-auto bg-white text-gray-800 font-sans pb-8">
			{/* Header */}
			<header className="p-8 text-white" style={{ backgroundColor: accentColor }}>
				<h1 className="text-4xl font-bold mb-1 tracking-tight">
					{data.personal_info?.full_name || "Your Name"}
				</h1>
				{data.personal_info?.profession && (
					<h2 className="text-xl font-medium mb-4 opacity-90">{data.personal_info.profession}</h2>
				)}

				<div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-6 text-sm font-medium mt-4">
					{data.personal_info?.email && (
						<div className="flex items-center gap-2">
							<Mail className="size-4 shrink-0 opacity-80" />
							<span>{data.personal_info.email}</span>
						</div>
					)}
					{data.personal_info?.phone && (
						<div className="flex items-center gap-2">
							<Phone className="size-4 shrink-0 opacity-80" />
							<span>{data.personal_info.phone}</span>
						</div>
					)}
					{data.personal_info?.location && (
						<div className="flex items-center gap-2">
							<MapPin className="size-4 shrink-0 opacity-80" />
							<span>{data.personal_info.location}</span>
						</div>
					)}
					{data.personal_info?.linkedin && (
						<a target="_blank" href={data.personal_info?.linkedin} rel="noreferrer" className="flex items-center gap-2 hover:opacity-80">
							<Linkedin className="size-4 shrink-0 opacity-80" />
							<span className="break-all text-sm">{data.personal_info.linkedin.replace(/^https?:\/\/(www\.)?/, '')}</span>
						</a>
					)}
					{data.personal_info?.github && (
						<a target="_blank" href={data.personal_info?.github} rel="noreferrer" className="flex items-center gap-2 hover:opacity-80">
							<Github className="size-4 shrink-0 opacity-80" />
							<span className="break-all text-sm">{data.personal_info.github.replace(/^https?:\/\/(www\.)?/, '')}</span>
						</a>
					)}
					{data.personal_info?.coding_platform && (
						<a target="_blank" href={data.personal_info?.coding_platform} rel="noreferrer" className="flex items-center gap-2 hover:opacity-80">
							<Code className="size-4 shrink-0 opacity-80" />
							<span className="break-all text-sm">{data.personal_info.coding_platform.replace(/^https?:\/\/(www\.)?/, '')}</span>
						</a>
					)}
					{data.personal_info?.website && (
						<a target="_blank" href={data.personal_info?.website} rel="noreferrer" className="flex items-center gap-2 hover:opacity-80">
							<Globe className="size-4 shrink-0 opacity-80" />
							<span className="break-all text-sm">{data.personal_info.website.replace(/^https?:\/\/(www\.)?/, '')}</span>
						</a>
					)}
				</div>
			</header>

			<div className="p-8">
				{/* Professional Summary */}
				{data.professional_summary && (
					<section className="mb-8">
						<h2 className="text-lg font-bold mb-4 pb-2 border-b-2 border-gray-100" style={{ color: accentColor }}>
							Professional Summary
						</h2>
						<p className="text-gray-700 leading-relaxed whitespace-pre-line">{data.professional_summary}</p>
					</section>
				)}

				{/* Experience */}
				{data.experience && data.experience.length > 0 && (
					<section className="mb-8">
						<h2 className="text-lg font-bold mb-6 pb-2 border-b-2 border-gray-100" style={{ color: accentColor }}>
							Experience
						</h2>
						<div className="space-y-6">
							{data.experience.map((exp, index) => (
								<div key={index} className="relative pl-6 border-l-2" style={{ borderColor: accentColor }}>
									<div className="absolute w-3 h-3 bg-white border-2 rounded-full -left-[7px] top-1.5" style={{ borderColor: accentColor }}></div>
									<div className="flex justify-between items-start mb-1">
										<div>
											<h3 className="text-lg font-bold text-gray-900">{exp.position}</h3>
											<p className="font-semibold text-gray-700">{exp.company}</p>
										</div>
										<div className="text-xs font-bold text-white px-2 py-1 rounded" style={{ backgroundColor: accentColor }}>
											{formatDate(exp.start_date)} - {exp.is_current ? "Present" : formatDate(exp.end_date)}
										</div>
									</div>
									{exp.description && (
										<div className="text-gray-700 leading-relaxed mt-2 whitespace-pre-line text-sm">
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
					<section className="mb-8">
						<h2 className="text-lg font-bold mb-6 pb-2 border-b-2 border-gray-100" style={{ color: accentColor }}>
							Internships
						</h2>
						<div className="space-y-6">
							{data.internships.map((intern, index) => (
								<div key={index} className="relative pl-6 border-l-2" style={{ borderColor: accentColor }}>
									<div className="absolute w-3 h-3 bg-white border-2 rounded-full -left-[7px] top-1.5" style={{ borderColor: accentColor }}></div>
									<div className="flex justify-between items-start mb-1">
										<div>
											<h3 className="text-lg font-bold text-gray-900">{intern.role}</h3>
											<p className="font-semibold text-gray-700">{intern.company}</p>
										</div>
										<div className="text-xs font-bold text-white px-2 py-1 rounded" style={{ backgroundColor: accentColor }}>
											{intern.duration}
										</div>
									</div>
									{intern.description && (
										<div className="text-gray-700 leading-relaxed mt-2 whitespace-pre-line text-sm">
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
					<section className="mb-8">
						<h2 className="text-lg font-bold mb-6 pb-2 border-b-2 border-gray-100" style={{ color: accentColor }}>
							Projects
						</h2>
						<div className="space-y-6">
							{data.projects.map((p, index) => (
								<div key={index} className="relative pl-6 border-l-2" style={{ borderColor: accentColor }}>
									<div className="absolute w-3 h-3 bg-white border-2 rounded-full -left-[7px] top-1.5" style={{ borderColor: accentColor }}></div>
									<div className="flex flex-wrap items-baseline gap-2 mb-1">
										<h3 className="text-lg font-bold text-gray-900">{p.name}</h3>
										{p.link && <a href={p.link} target="_blank" rel="noreferrer" className="text-sm font-medium hover:underline" style={{ color: accentColor }}>| Link</a>}
									</div>
									{p.type && <p className="text-sm font-semibold text-gray-500">{p.type}</p>}
									{p.description && (
										<div className="text-gray-700 leading-relaxed text-sm mt-2 whitespace-pre-line">
											{p.description}
										</div>
									)}
								</div>
							))}
						</div>
					</section>
				)}

				{/* Hackathons */}
				{data.hackathons && data.hackathons.length > 0 && (
					<section className="mb-8">
						<h2 className="text-lg font-bold mb-6 pb-2 border-b-2 border-gray-100" style={{ color: accentColor }}>
							Hackathons & Achievements
						</h2>
						<div className="space-y-6">
							{data.hackathons.map((hack, index) => (
								<div key={index} className="relative pl-6 border-l-2" style={{ borderColor: accentColor }}>
									<div className="absolute w-3 h-3 bg-white border-2 rounded-full -left-[7px] top-1.5" style={{ borderColor: accentColor }}></div>
									<div className="flex justify-between items-baseline mb-1">
										<h3 className="text-lg font-bold text-gray-900">{hack.name}</h3>
										<span className="text-sm font-semibold text-gray-500">{formatDate(hack.date)}</span>
									</div>
									{hack.achievement && <p className="text-sm font-bold" style={{ color: accentColor }}>{hack.achievement}</p>}
									{hack.description && (
										<div className="text-gray-700 leading-relaxed text-sm mt-2 whitespace-pre-line">
											{hack.description}
										</div>
									)}
								</div>
							))}
						</div>
					</section>
				)}
				{/* Leadership & Extracurriculars */}
				{data.leadership && data.leadership.length > 0 && (
					<section className="mb-8">
						<h2 className="text-lg font-bold mb-6 pb-2 border-b-2 border-gray-100" style={{ color: accentColor }}>
							Positions of Responsibility
						</h2>
						<div className="space-y-6">
							{data.leadership.map((item, index) => (
								<div key={index} className="relative pl-6 border-l-2" style={{ borderColor: accentColor }}>
									<div className="absolute w-3 h-3 bg-white border-2 rounded-full -left-[7px] top-1.5" style={{ borderColor: accentColor }}></div>
									<div className="flex justify-between items-baseline mb-1">
										<h3 className="text-lg font-bold text-gray-900">{item.role}</h3>
										<span className="text-sm font-semibold text-gray-500">{item.date}</span>
									</div>
									{item.organization && <p className="text-sm font-bold" style={{ color: accentColor }}>{item.organization}</p>}
									{item.description && (
										<div className="text-gray-700 leading-relaxed text-sm mt-2 whitespace-pre-line">
											{item.description}
										</div>
									)}
								</div>
							))}
						</div>
					</section>
				)}

				<div className="grid sm:grid-cols-2 gap-8">
					{/* Education */}
					{data.education && data.education.length > 0 && (
						<section>
							<h2 className="text-lg font-bold mb-4 pb-2 border-b-2 border-gray-100" style={{ color: accentColor }}>
								Education
							</h2>
							<div className="space-y-4">
								{data.education.map((edu, index) => (
									<div key={index}>
										<h3 className="font-bold text-gray-900">
											{edu.degree} {edu.field && `in ${edu.field}`}
										</h3>
										<p className="font-medium text-gray-700">{edu.institution}</p>
										<div className="flex justify-between items-center text-sm font-semibold text-gray-500 mt-1">
											<span>{formatDate(edu.graduation_date)}</span>
											{edu.gpa && <span style={{ color: accentColor }}>GPA: {edu.gpa}</span>}
										</div>
									</div>
								))}
							</div>
						</section>
					)}

					{/* Skills */}
					{data.skills && data.skills.length > 0 && (
						<section className="pb-4">
							<h2 className="text-lg font-bold mb-4 pb-2 border-b-2 border-gray-100" style={{ color: accentColor }}>
								Skills
							</h2>
							<div className="flex flex-wrap gap-2">
								{data.skills.map((skill, index) => (
									<span
										key={index}
										className="px-3 py-1.5 text-sm font-semibold text-white rounded"
										style={{ backgroundColor: accentColor }}
									>
										{skill}
									</span>
								))}
							</div>
						</section>
					)}
				</div>
			</div>
		</div>
	);
}

export default ModernTemplate;