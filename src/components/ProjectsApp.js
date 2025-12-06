'use client';

import { useState } from 'react';

/**
 * ProjectsApp - Portfolio projects showcase
 */
export default function ProjectsApp({ portfolioData }) {
  const [selectedProject, setSelectedProject] = useState(null);

  if (!portfolioData || !portfolioData.projects) {
    return (
      <div className="flex items-center justify-center h-full text-xs text-gray-600">
        Loading projects...
      </div>
    );
  }

  const { projects } = portfolioData;

  return (
    <div className="h-full flex bg-window overflow-hidden">
      {/* Project List */}
      <div className="w-64 border-r-2 border-btn-shadow flex flex-col">
        <div className="bg-panel px-3 py-2 border-b-2 border-btn-shadow">
          <h2 className="text-xs font-bold">Projects ({projects.length})</h2>
        </div>
        <div className="flex-1 overflow-y-auto">
          {projects.map((project) => (
            <button
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className={`w-full text-left px-3 py-2 text-xs border-b border-gray-300 hover:bg-selection hover:text-selection ${
                selectedProject?.id === project.id ? 'bg-selection text-selection' : ''
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="text-2xl">{project.image}</span>
                <div className="flex-1 min-w-0">
                  <div className="font-bold truncate">{project.name}</div>
                  <div className="text-[10px] opacity-75 truncate">{project.tagline}</div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Project Details */}
      <div className="flex-1 overflow-y-auto p-4 text-xs">
        {selectedProject ? (
          <div className="space-y-3">
            {/* Header */}
            <div className="retro-border-in bg-white p-3">
              <div className="flex items-start gap-3">
                <span className="text-5xl">{selectedProject.image}</span>
                <div className="flex-1">
                  <h1 className="text-base font-bold mb-1">{selectedProject.name}</h1>
                  <p className="text-xs text-gray-600 mb-2">{selectedProject.tagline}</p>
                  <div className="flex gap-2 items-center">
                    <span className={`retro-button px-2 py-0.5 text-[10px] ${
                      selectedProject.status === 'active' ? 'bg-green-200' : 'bg-blue-200'
                    }`}>
                      {selectedProject.status}
                    </span>
                    <span className="text-gray-600">{selectedProject.year}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="retro-border-in bg-white p-3">
              <h3 className="font-bold mb-2">Description</h3>
              <p className="leading-relaxed">{selectedProject.description}</p>
            </div>

            {/* Technologies */}
            <div className="retro-border-in bg-white p-3">
              <h3 className="font-bold mb-2">Technologies Used</h3>
              <div className="flex flex-wrap gap-1">
                {selectedProject.technologies.map((tech, index) => (
                  <span key={index} className="retro-button px-2 py-1 text-[10px]">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Features */}
            <div className="retro-border-in bg-white p-3">
              <h3 className="font-bold mb-2">Key Features</h3>
              <ul className="space-y-1 list-disc list-inside">
                {selectedProject.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>

            {/* Stats */}
            {selectedProject.stats && (
              <div className="retro-border-in bg-white p-3">
                <h3 className="font-bold mb-2">Statistics</h3>
                <div className="grid grid-cols-3 gap-2">
                  {Object.entries(selectedProject.stats).map(([key, value]) => (
                    <div key={key} className="retro-border-in bg-panel p-2 text-center">
                      <div className="text-lg font-bold text-titlebar-active">{value}</div>
                      <div className="text-[10px] text-gray-600 capitalize">{key}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Links */}
            <div className="retro-border-in bg-white p-3">
              <h3 className="font-bold mb-2">Links</h3>
              <div className="flex gap-2">
                {selectedProject.github && (
                  <button className="retro-button px-3 py-1 text-xs flex items-center gap-1">
                    <span>💻</span>
                    <span>GitHub</span>
                  </button>
                )}
                {selectedProject.demo && (
                  <button className="retro-button px-3 py-1 text-xs flex items-center gap-1">
                    <span>🌐</span>
                    <span>Live Demo</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            <div className="text-center">
              <div className="text-4xl mb-2">📁</div>
              <div>Select a project to view details</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
