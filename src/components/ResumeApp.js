'use client';

/**
 * ResumeApp - Full resume view with print capability
 */
export default function ResumeApp({ portfolioData }) {
  if (!portfolioData) {
    return (
      <div className="flex items-center justify-center h-full text-xs text-gray-600">
        Loading resume...
      </div>
    );
  }

  const { personal, about, experience, education, skills, certifications } = portfolioData;

  const formatDate = (dateStr) => {
    if (!dateStr) return 'Present';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    alert('Download feature would export as PDF in production');
  };

  return (
    <div className="h-full flex flex-col bg-window overflow-hidden">
      {/* Toolbar */}
      <div className="flex items-center gap-2 p-2 border-b-2 border-btn-shadow bg-panel">
        <button onClick={handlePrint} className="retro-button px-3 py-1 text-xs flex items-center gap-1">
          <span>🖨️</span>
          <span>Print</span>
        </button>
        <button onClick={handleDownload} className="retro-button px-3 py-1 text-xs flex items-center gap-1">
          <span>💾</span>
          <span>Download PDF</span>
        </button>
      </div>

      {/* Resume Content */}
      <div className="flex-1 overflow-y-auto p-6 text-xs bg-white">
        <div className="max-w-4xl mx-auto space-y-4">
          {/* Header */}
          <div className="text-center border-b-2 border-black pb-3">
            <h1 className="text-2xl font-bold mb-1">{personal.name}</h1>
            <p className="text-sm mb-2">{personal.title}</p>
            <div className="flex justify-center gap-4 text-[10px]">
              <span>{personal.email}</span>
              <span>•</span>
              <span>{personal.phone}</span>
              <span>•</span>
              <span>{personal.location}</span>
            </div>
            <div className="flex justify-center gap-3 mt-1 text-[10px]">
              <span>{personal.website}</span>
              <span>•</span>
              <span>{personal.github}</span>
              <span>•</span>
              <span>{personal.linkedin}</span>
            </div>
          </div>

          {/* Summary */}
          <div>
            <h2 className="text-sm font-bold border-b border-black mb-2">PROFESSIONAL SUMMARY</h2>
            <p className="leading-relaxed">{about.summary}</p>
          </div>

          {/* Skills */}
          <div>
            <h2 className="text-sm font-bold border-b border-black mb-2">TECHNICAL SKILLS</h2>
            <div className="space-y-1">
              <div>
                <span className="font-bold">Frontend:</span>{' '}
                {skills.frontend.map(s => s.name).join(', ')}
              </div>
              <div>
                <span className="font-bold">Backend:</span>{' '}
                {skills.backend.map(s => s.name).join(', ')}
              </div>
              <div>
                <span className="font-bold">Tools:</span>{' '}
                {skills.tools.map(s => s.name).join(', ')}
              </div>
            </div>
          </div>

          {/* Experience */}
          <div>
            <h2 className="text-sm font-bold border-b border-black mb-2">PROFESSIONAL EXPERIENCE</h2>
            <div className="space-y-3">
              {experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold">{exp.position}</h3>
                      <p className="italic">{exp.company} - {exp.location}</p>
                    </div>
                    <div className="text-right text-[10px]">
                      {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                    </div>
                  </div>
                  <ul className="list-disc list-inside mt-1 space-y-0.5">
                    {exp.responsibilities.slice(0, 4).map((resp, idx) => (
                      <li key={idx} className="text-[11px]">{resp}</li>
                    ))}
                  </ul>
                  {exp.achievements && exp.achievements.length > 0 && (
                    <ul className="list-disc list-inside mt-1 space-y-0.5">
                      {exp.achievements.map((achievement, idx) => (
                        <li key={idx} className="text-[11px] font-semibold">{achievement}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <h2 className="text-sm font-bold border-b border-black mb-2">EDUCATION</h2>
            {education.map((edu, idx) => (
              <div key={idx} className="mb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold">{edu.degree}</h3>
                    <p className="italic">{edu.institution}</p>
                    {edu.gpa && <p className="text-[11px]">GPA: {edu.gpa}</p>}
                  </div>
                  <div className="text-right text-[10px]">
                    {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                  </div>
                </div>
                {edu.honors && edu.honors.length > 0 && (
                  <p className="text-[11px] mt-1">
                    <span className="font-bold">Honors:</span> {edu.honors.join(', ')}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Certifications */}
          {certifications && certifications.length > 0 && (
            <div>
              <h2 className="text-sm font-bold border-b border-black mb-2">CERTIFICATIONS</h2>
              <ul className="space-y-1">
                {certifications.map((cert, idx) => (
                  <li key={idx}>
                    <span className="font-bold">{cert.name}</span> - {cert.issuer} ({formatDate(cert.date)})
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Achievements */}
          {portfolioData.achievements && (
            <div>
              <h2 className="text-sm font-bold border-b border-black mb-2">ACHIEVEMENTS</h2>
              <ul className="list-disc list-inside space-y-0.5">
                {portfolioData.achievements.map((achievement, idx) => (
                  <li key={idx} className="text-[11px]">{achievement}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
