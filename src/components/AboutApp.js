'use client';

import { useState, useEffect } from 'react';

/**
 * AboutApp - Portfolio About section with bio, interests, and skills
 */
export default function AboutApp({ portfolioData }) {
  const [activeTab, setActiveTab] = useState('bio');
  
  if (!portfolioData) {
    return (
      <div className="flex items-center justify-center h-full text-xs text-gray-600">
        Loading portfolio data...
      </div>
    );
  }

  const { personal, about, skills } = portfolioData;

  return (
    <div className="h-full flex flex-col bg-window overflow-hidden">
      {/* Header */}
      <div className="bg-titlebar-active text-titlebar-text px-4 py-3 border-b-2 border-btn-shadow">
        <div className="flex items-center gap-3">
          <span className="text-4xl">{personal.avatar}</span>
          <div>
            <h1 className="text-base font-bold">{personal.name}</h1>
            <p className="text-xs opacity-90">{personal.title}</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b-2 border-btn-shadow bg-panel">
        {['bio', 'skills', 'interests'].map((tab) => (
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
        {activeTab === 'bio' && (
          <div className="space-y-4">
            <div className="retro-border-in bg-white p-3">
              <h2 className="font-bold mb-2 text-sm">Summary</h2>
              <p className="leading-relaxed">{about.summary}</p>
            </div>

            <div className="retro-border-in bg-white p-3">
              <h2 className="font-bold mb-2 text-sm">About Me</h2>
              <ul className="space-y-1 list-disc list-inside">
                {about.bio.map((item, index) => (
                  <li key={index} className="leading-relaxed">{item}</li>
                ))}
              </ul>
            </div>

            <div className="retro-border-in bg-white p-3">
              <h2 className="font-bold mb-2 text-sm">Languages</h2>
              <div className="flex flex-wrap gap-2">
                {about.languages.map((lang, index) => (
                  <span key={index} className="retro-button px-2 py-1 text-xs">
                    {lang}
                  </span>
                ))}
              </div>
            </div>

            <div className="retro-border-in bg-white p-3">
              <h2 className="font-bold mb-2 text-sm">Contact Information</h2>
              <div className="space-y-1">
                <p>📧 {personal.email}</p>
                <p>📱 {personal.phone}</p>
                <p>📍 {personal.location}</p>
                <p>🌐 {personal.website}</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'skills' && (
          <div className="space-y-4">
            <div className="retro-border-in bg-white p-3">
              <h2 className="font-bold mb-3 text-sm">Frontend Development</h2>
              {skills.frontend.map((skill) => (
                <div key={skill.name} className="mb-2">
                  <div className="flex justify-between mb-1">
                    <span>{skill.name}</span>
                    <span className="text-gray-600">{skill.years} years</span>
                  </div>
                  <div className="retro-border-in bg-white h-5">
                    <div
                      className="h-full bg-selection"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="retro-border-in bg-white p-3">
              <h2 className="font-bold mb-3 text-sm">Backend Development</h2>
              {skills.backend.map((skill) => (
                <div key={skill.name} className="mb-2">
                  <div className="flex justify-between mb-1">
                    <span>{skill.name}</span>
                    <span className="text-gray-600">{skill.years} years</span>
                  </div>
                  <div className="retro-border-in bg-white h-5">
                    <div
                      className="h-full bg-selection"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="retro-border-in bg-white p-3">
              <h2 className="font-bold mb-3 text-sm">Tools & Technologies</h2>
              {skills.tools.map((skill) => (
                <div key={skill.name} className="mb-2">
                  <div className="flex justify-between mb-1">
                    <span>{skill.name}</span>
                    <span className="text-gray-600">{skill.years} years</span>
                  </div>
                  <div className="retro-border-in bg-white h-5">
                    <div
                      className="h-full bg-selection"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'interests' && (
          <div className="space-y-4">
            <div className="retro-border-in bg-white p-3">
              <h2 className="font-bold mb-3 text-sm">Areas of Interest</h2>
              <div className="grid grid-cols-2 gap-2">
                {about.interests.map((interest, index) => (
                  <div key={index} className="retro-button px-3 py-2 text-center">
                    {interest}
                  </div>
                ))}
              </div>
            </div>

            {portfolioData.achievements && (
              <div className="retro-border-in bg-white p-3">
                <h2 className="font-bold mb-3 text-sm">Achievements</h2>
                <ul className="space-y-1 list-disc list-inside">
                  {portfolioData.achievements.map((achievement, index) => (
                    <li key={index} className="leading-relaxed">{achievement}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
