'use client';

import { useState } from 'react';

/**
 * ContactApp - Contact form and social links
 */
export default function ContactApp({ portfolioData }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState('');

  if (!portfolioData) {
    return (
      <div className="flex items-center justify-center h-full text-xs text-gray-600">
        Loading contact info...
      </div>
    );
  }

  const { personal } = portfolioData;

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('Fork it and do it yourself—I left it for you!');
    setTimeout(() => {
      setStatus('');
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="h-full flex bg-window overflow-hidden">
      {/* Contact Info Sidebar */}
      <div className="w-64 border-r-2 border-btn-shadow flex flex-col bg-panel">
        <div className="p-3 border-b-2 border-btn-shadow">
          <h2 className="text-xs font-bold mb-3">Contact Information</h2>
          <div className="space-y-3 text-xs">
            <div className="retro-border-in bg-white p-2">
              <div className="text-[10px] text-gray-600 mb-1">Email</div>
              <div className="font-mono text-[11px] break-all">{personal.email}</div>
            </div>
            <div className="retro-border-in bg-white p-2">
              <div className="text-[10px] text-gray-600 mb-1">Phone</div>
              <div className="font-mono text-[11px]">{personal.phone}</div>
            </div>
            <div className="retro-border-in bg-white p-2">
              <div className="text-[10px] text-gray-600 mb-1">Location</div>
              <div className="text-[11px]">{personal.location}</div>
            </div>
          </div>
        </div>

        <div className="p-3 flex-1">
          <h3 className="text-xs font-bold mb-2">Social Links</h3>
          <div className="space-y-2">
            <button onClick={() => window.open(personal.website, '_blank')} className="retro-button w-full px-2 py-2 text-xs flex items-center gap-2">
              <span>🌐</span>
              <span>Website</span>
            </button>
            <button onClick={() => window.open(personal.linkedin, '_blank')} className="retro-button w-full px-2 py-2 text-xs flex items-center gap-2">
              <span>💼</span>
              <span>LinkedIn</span>
            </button>
            <button onClick={() => window.open(personal.github, '_blank')} className="retro-button w-full px-2 py-2 text-xs flex items-center gap-2">
              <span>💻</span>
              <span>GitHub</span>
            </button>
            <button onClick={() => window.open(personal.twitter, '_blank')} className="retro-button w-full px-2 py-2 text-xs flex items-center gap-2">
              <span>🐦</span>
              <span>Twitter</span>
            </button>
          </div>
        </div>

        {portfolioData.testimonials && (
          <div className="p-3 border-t-2 border-btn-shadow bg-panel">
            <h3 className="text-xs font-bold mb-2">Availability</h3>
            <div className="retro-border-in bg-white p-2 text-xs">
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                <span className="font-bold">Available for work</span>
              </div>
              <div className="text-[10px] text-gray-600">
                Open to new opportunities
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Contact Form */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-2xl">
          <h2 className="text-sm font-bold mb-3">Send a Message</h2>

          <form onSubmit={handleSubmit} className="space-y-3">
            {/* Name */}
            <div>
              <label className="block text-xs font-bold mb-1">Your Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="retro-border-in w-full px-2 py-1 text-xs bg-white"
                placeholder="John Doe"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-bold mb-1">Your Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="retro-border-in w-full px-2 py-1 text-xs bg-white"
                placeholder="john@example.com"
              />
            </div>

            {/* Subject */}
            <div>
              <label className="block text-xs font-bold mb-1">Subject *</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="retro-border-in w-full px-2 py-1 text-xs bg-white"
                placeholder="Project inquiry"
              />
            </div>

            {/* Message */}
            <div>
              <label className="block text-xs font-bold mb-1">Message *</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="8"
                className="retro-border-in w-full px-2 py-1 text-xs bg-white resize-none"
                placeholder="Your message here..."
              />
            </div>

            {/* Submit Button */}
            <div className="flex items-center gap-3">
              <button type="submit" className="retro-button px-4 py-2 text-xs font-bold">
                📧 Send Message
              </button>
              {status && (
                <span className="text-xs text-green-700 font-bold">{status}</span>
              )}
            </div>
          </form>

          {/* Additional Info */}
          <div className="mt-6 retro-border-in bg-white p-3 text-xs">
            <h3 className="font-bold mb-2">💡 Quick Tips</h3>
            <ul className="space-y-1 list-disc list-inside text-[11px] text-gray-700">
              <li>Response time: Usually within 24 hours</li>
              <li>For urgent matters, use phone or email directly</li>
              <li>Include project details and timeline if applicable</li>
              <li>Check spam folder for replies</li>
            </ul>
          </div>

          {/* Testimonials */}
          {portfolioData.testimonials && portfolioData.testimonials.length > 0 && (
            <div className="mt-4">
              <h3 className="text-sm font-bold mb-3">What People Say</h3>
              <div className="space-y-3">
                {portfolioData.testimonials.map((testimonial, idx) => (
                  <div key={idx} className="retro-border-in bg-white p-3">
                    <p className="text-xs leading-relaxed mb-2 italic">"{testimonial.text}"</p>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{testimonial.avatar}</span>
                      <div className="text-[11px]">
                        <div className="font-bold">{testimonial.name}</div>
                        <div className="text-gray-600">{testimonial.role}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
