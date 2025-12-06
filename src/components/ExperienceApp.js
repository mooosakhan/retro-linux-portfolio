'use client';

import { useState } from 'react';

/**
 * ExperienceApp - Work experience and education display
 */
export default function ExperienceApp({ portfolioData }) {
  const [activeTab, setActiveTab] = useState('experience');

  if (!portfolioData) {
    return (
      <div className="flex items-center justify-center h-full text-xs text-gray-600">
        Loading experience data...
      </div>
    );
  }

  const { experience, education, certifications } = portfolioData;

  const formatDate = (dateStr) => {
    if (!dateStr) return 'Present';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  };

  const calculateDuration = (start, end) => {
    const startDate = new Date(start);
    const endDate = end ? new Date(end) : new Date();
    const months = (endDate.getFullYear() - startDate.getFullYear()) * 12 + 
                   (endDate.getMonth() - startDate.getMonth());
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    return years > 0 
      ? `${years} yr${years > 1 ? 's' : ''} ${remainingMonths} mo${remainingMonths !== 1 ? 's' : ''}`
      : `${remainingMonths} mo${remainingMonths !== 1 ? 's' : ''}`;
  };

  return (
    <div className="h-full flex flex-col bg-window overflow-hidden">
      {/* Tabs */}
      <div className="flex border-b-2 border-btn-shadow bg-panel">
        {['experience', 'education', 'certifications'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-xs font-bold uppercase ${
              activeTab === tab
                ? 'bg-window border-t-2 border-l-2 border-r-2 border-btn-highlight -mb-0.5'
                : 'bg-panel hover:bg-btn-face'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 text-xs">
        {activeTab === 'experience' && (
          <div className="space-y-4">
            {experience.map((exp) => (
              <div key={exp.id} className="retro-border-in bg-white p-3">
                {/* Header */}
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-1">
                    <h3 className="font-bold text-sm">{exp.position}</h3>
                    <p className="text-titlebar-active font-bold">{exp.company}</p>
                    <p className="text-gray-600 text-[10px]">
                      {exp.location} • {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                      {' '}({calculateDuration(exp.startDate, exp.endDate)})
                    </p>
                  </div>
                  {exp.current && (
                    <span className="retro-button px-2 py-0.5 text-[10px] bg-green-200">
                      Current
                    </span>
                  )}
                </div>

                {/* Description */}
                <p className="mb-2 leading-relaxed">{exp.description}</p>

                {/* Responsibilities */}
                <div className="mb-2">
                  <h4 className="font-bold mb-1">Key Responsibilities:</h4>
                  <ul className="space-y-0.5 list-disc list-inside pl-2">
                    {exp.responsibilities.map((resp, index) => (
                      <li key={index} className="text-[11px]">{resp}</li>
                    ))}
                  </ul>
                </div>

                {/* Technologies */}
                <div className="mb-2">
                  <h4 className="font-bold mb-1">Technologies:</h4>
                  <div className="flex flex-wrap gap-1">
                    {exp.technologies.map((tech, index) => (
                      <span key={index} className="retro-button px-2 py-0.5 text-[10px]">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Achievements */}
                {exp.achievements && exp.achievements.length > 0 && (
                  <div>
                    <h4 className="font-bold mb-1">Key Achievements:</h4>
                    <ul className="space-y-0.5 list-disc list-inside pl-2">
                      {exp.achievements.map((achievement, index) => (
                        <li key={index} className="text-[11px] text-green-700">{achievement}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {activeTab === 'education' && (
          <div className="space-y-4">
            {education.map((edu, index) => (
              <div key={index} className="retro-border-in bg-white p-3">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-bold text-sm">{edu.degree}</h3>
                    <p className="text-titlebar-active font-bold">{edu.institution}</p>
                    <p className="text-gray-600 text-[10px]">
                      {edu.location} • {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                    </p>
                  </div>
                  {edu.gpa && (
                    <div className="retro-border-in bg-panel px-2 py-1">
                      <div className="text-[10px] text-gray-600">GPA</div>
                      <div className="font-bold">{edu.gpa}</div>
                    </div>
                  )}
                </div>

                {edu.honors && edu.honors.length > 0 && (
                  <div className="mb-2">
                    <h4 className="font-bold mb-1">Honors:</h4>
                    <div className="flex flex-wrap gap-1">
                      {edu.honors.map((honor, idx) => (
                        <span key={idx} className="retro-button px-2 py-0.5 text-[10px] bg-yellow-100">
                          🏆 {honor}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {edu.relevant && edu.relevant.length > 0 && (
                  <div>
                    <h4 className="font-bold mb-1">Relevant Coursework:</h4>
                    <div className="grid grid-cols-2 gap-1">
                      {edu.relevant.map((course, idx) => (
                        <div key={idx} className="text-[11px]">• {course}</div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {activeTab === 'certifications' && (
          <div className="space-y-3">
            {certifications && certifications.length > 0 ? (
              certifications.map((cert, index) => (
                <div key={index} className="retro-border-in bg-white p-3 flex items-start gap-3">
                  <span className="text-3xl">🎓</span>
                  <div className="flex-1">
                    <h3 className="font-bold text-sm">{cert.name}</h3>
                    <p className="text-titlebar-active">{cert.issuer}</p>
                    <p className="text-gray-600 text-[10px]">
                      Issued: {formatDate(cert.date)}
                    </p>
                    {cert.id && (
                      <p className="text-[10px] mt-1 font-mono">ID: {cert.id}</p>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                No certifications available
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
