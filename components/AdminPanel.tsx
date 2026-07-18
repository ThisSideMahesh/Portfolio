"use client";

import React, { useState, useEffect } from "react";
import { Lock, Unlock, Save, Download, Plus, Trash2, Edit, Check, Eye } from "lucide-react";
import { motion } from "framer-motion";

export default function AdminPanel({
  portfolioData,
  onUpdateData
}: {
  portfolioData: any;
  onUpdateData: (newData: any) => void;
}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState<"personal" | "experience" | "projects" | "certifications" | "blogs" | "achievements">("personal");
  
  // Local state editor copies
  const [localData, setLocalData] = useState<any>(null);

  useEffect(() => {
    if (portfolioData) {
      setLocalData(JSON.parse(JSON.stringify(portfolioData)));
    }
  }, [portfolioData]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "mahesh123") {
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("Incorrect administrator password.");
    }
  };

  const handleSave = () => {
    onUpdateData(localData);
    alert("Changes saved locally! To make them permanent, click 'Download JSON' and replace the file at 'public/data/portfolio.json'.");
  };

  const handleDownload = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(localData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "portfolio.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Add / Delete Helpers
  const addExperience = () => {
    setLocalData((prev: any) => ({
      ...prev,
      experiences: [
        ...prev.experiences,
        { company: "New Company", role: "Software Developer", period: "2026 - Present", description: "Duties and accomplishments description here." }
      ]
    }));
  };

  const deleteExperience = (index: number) => {
    setLocalData((prev: any) => ({
      ...prev,
      experiences: prev.experiences.filter((_: any, i: number) => i !== index)
    }));
  };

  const addProject = () => {
    setLocalData((prev: any) => ({
      ...prev,
      projects: [
        ...prev.projects,
        { title: "New Project", category: "Web App", tech: "React, Tailwind", description: "Brief description of the project.", image: "/projects/solid-starters.png", github: "#", demo: "#", status: "Completed", featured: false }
      ]
    }));
  };

  const deleteProject = (index: number) => {
    setLocalData((prev: any) => ({
      ...prev,
      projects: prev.projects.filter((_: any, i: number) => i !== index)
    }));
  };

  const addCertification = () => {
    setLocalData((prev: any) => ({
      ...prev,
      certifications: [
        ...prev.certifications,
        { title: "New Certification Certificate", issuer: "Authority", verificationLink: "#", date: "2026" }
      ]
    }));
  };

  const deleteCertification = (index: number) => {
    setLocalData((prev: any) => ({
      ...prev,
      certifications: prev.certifications.filter((_: any, i: number) => i !== index)
    }));
  };

  const addBlog = () => {
    setLocalData((prev: any) => ({
      ...prev,
      blogs: [
        ...prev.blogs,
        { id: "new-blog-post", title: "New Blog Post", category: "Programming", date: "Feb 2026", excerpt: "Short introduction snippet.", tags: ["DevOps"], readingTime: "3 min" }
      ]
    }));
  };

  const deleteBlog = (index: number) => {
    setLocalData((prev: any) => ({
      ...prev,
      blogs: prev.blogs.filter((_: any, i: number) => i !== index)
    }));
  };

  const addAchievement = () => {
    setLocalData((prev: any) => ({
      ...prev,
      achievements: [
        ...prev.achievements,
        { title: "New Achievement Title", category: "Awards", date: "2026", description: "Details of achievement." }
      ]
    }));
  };

  const deleteAchievement = (index: number) => {
    setLocalData((prev: any) => ({
      ...prev,
      achievements: prev.achievements.filter((_: any, i: number) => i !== index)
    }));
  };

  if (!localData) return null;

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#020202] flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md p-8 glass-panel rounded-3xl border border-white/10"
        >
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-500 mb-4">
              <Lock size={32} />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-white">Admin Console</h1>
            <p className="text-xs text-zinc-400 mt-2 text-center">
              Authenticate to edit experiences, projects, and certifications.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-mono text-zinc-400 mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                className="w-full px-4 py-3 bg-zinc-900 border border-white/10 rounded-2xl text-sm text-zinc-100 focus:outline-none focus:border-amber-500/50"
              />
              {error && <p className="text-red-500 text-[11px] mt-2 font-mono">{error}</p>}
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-[#020202] font-semibold rounded-2xl transition-colors cursor-pointer flex items-center justify-center gap-2"
            >
              <Unlock size={16} /> Unlock Dashboard
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020202] text-zinc-100 p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 pb-6 border-b border-white/10">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white">Creative Admin Panel</h1>
            <p className="text-sm text-zinc-400 mt-2">
              Update details live on your portfolio without touching the codebase.
            </p>
          </div>

          <div className="flex gap-4">
            <button
              onClick={handleSave}
              className="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-[#020202] font-medium rounded-xl flex items-center gap-2 transition-colors cursor-pointer text-sm"
            >
              <Save size={16} /> Apply Live
            </button>
            <button
              onClick={handleDownload}
              className="px-5 py-2.5 bg-zinc-900 hover:bg-zinc-800 border border-white/10 font-medium rounded-xl flex items-center gap-2 transition-colors cursor-pointer text-sm"
            >
              <Download size={16} /> Download JSON
            </button>
          </div>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Navigation */}
          <div className="space-y-2">
            {[
              { id: "personal", label: "Personal Bio & Socials" },
              { id: "experience", label: "Experience Timeline" },
              { id: "projects", label: "Project Portfolio" },
              { id: "certifications", label: "Certifications" },
              { id: "blogs", label: "Blog Articles" },
              { id: "achievements", label: "Achievements & Karate" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`w-full text-left px-4 py-3 rounded-xl transition-all cursor-pointer text-sm font-medium ${
                  activeTab === tab.id
                    ? "bg-amber-500/10 text-amber-500 border-l-2 border-amber-500"
                    : "hover:bg-white/5 text-zinc-400 hover:text-zinc-100"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Content Area */}
          <div className="lg:col-span-3 glass-panel p-6 rounded-3xl border border-white/10 space-y-6">
            {/* PERSONAL TAB */}
            {activeTab === "personal" && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold mb-4 text-white">Edit Personal Bio</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-zinc-400 mb-2">Display Name</label>
                    <input
                      type="text"
                      value={localData.personal.name}
                      onChange={(e) => setLocalData((prev: any) => ({
                        ...prev,
                        personal: { ...prev.personal, name: e.target.value }
                      }))}
                      className="w-full px-4 py-2.5 bg-zinc-900 border border-white/10 rounded-xl text-xs text-zinc-100 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-zinc-400 mb-2">Main Role Title</label>
                    <input
                      type="text"
                      value={localData.personal.role}
                      onChange={(e) => setLocalData((prev: any) => ({
                        ...prev,
                        personal: { ...prev.personal, role: e.target.value }
                      }))}
                      className="w-full px-4 py-2.5 bg-zinc-900 border border-white/10 rounded-xl text-xs text-zinc-100 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-zinc-400 mb-2">Brand Tagline</label>
                  <input
                    type="text"
                    value={localData.personal.tagline}
                    onChange={(e) => setLocalData((prev: any) => ({
                      ...prev,
                      personal: { ...prev.personal, tagline: e.target.value }
                    }))}
                    className="w-full px-4 py-2.5 bg-zinc-900 border border-white/10 rounded-xl text-xs text-zinc-100 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-zinc-400 mb-2">Biography Profile</label>
                  <textarea
                    value={localData.personal.bio}
                    onChange={(e) => setLocalData((prev: any) => ({
                      ...prev,
                      personal: { ...prev.personal, bio: e.target.value }
                    }))}
                    rows={5}
                    className="w-full px-4 py-2.5 bg-zinc-900 border border-white/10 rounded-xl text-xs text-zinc-100 focus:outline-none resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-zinc-400 mb-2">Email Address</label>
                    <input
                      type="text"
                      value={localData.personal.socials.email}
                      onChange={(e) => setLocalData((prev: any) => ({
                        ...prev,
                        personal: {
                          ...prev.personal,
                          socials: { ...prev.personal.socials, email: e.target.value }
                        }
                      }))}
                      className="w-full px-4 py-2.5 bg-zinc-900 border border-white/10 rounded-xl text-xs text-zinc-100 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-zinc-400 mb-2">Phone Number</label>
                    <input
                      type="text"
                      value={localData.personal.socials.phone}
                      onChange={(e) => setLocalData((prev: any) => ({
                        ...prev,
                        personal: {
                          ...prev.personal,
                          socials: { ...prev.personal.socials, phone: e.target.value }
                        }
                      }))}
                      className="w-full px-4 py-2.5 bg-zinc-900 border border-white/10 rounded-xl text-xs text-zinc-100 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* EXPERIENCE TAB */}
            {activeTab === "experience" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-white">Edit Experiences</h2>
                  <button
                    onClick={addExperience}
                    className="px-3 py-1.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-500 text-xs font-medium rounded-lg flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <Plus size={14} /> Add Role
                  </button>
                </div>

                <div className="space-y-6">
                  {localData.experiences.map((exp: any, index: number) => (
                    <div key={index} className="p-4 bg-zinc-950/50 border border-white/5 rounded-2xl space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono text-amber-500">Role #{index + 1}</span>
                        <button
                          onClick={() => deleteExperience(index)}
                          className="text-red-500 hover:text-red-400 p-1 rounded hover:bg-red-500/10 transition-colors cursor-pointer"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-[10px] font-mono text-zinc-400 mb-1">Company</label>
                          <input
                            type="text"
                            value={exp.company}
                            onChange={(e) => {
                              const updated = [...localData.experiences];
                              updated[index].company = e.target.value;
                              setLocalData((prev: any) => ({ ...prev, experiences: updated }));
                            }}
                            className="w-full px-3 py-2 bg-zinc-900 border border-white/10 rounded-lg text-xs text-zinc-100"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-mono text-zinc-400 mb-1">Role</label>
                          <input
                            type="text"
                            value={exp.role}
                            onChange={(e) => {
                              const updated = [...localData.experiences];
                              updated[index].role = e.target.value;
                              setLocalData((prev: any) => ({ ...prev, experiences: updated }));
                            }}
                            className="w-full px-3 py-2 bg-zinc-900 border border-white/10 rounded-lg text-xs text-zinc-100"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-mono text-zinc-400 mb-1">Period</label>
                          <input
                            type="text"
                            value={exp.period}
                            onChange={(e) => {
                              const updated = [...localData.experiences];
                              updated[index].period = e.target.value;
                              setLocalData((prev: any) => ({ ...prev, experiences: updated }));
                            }}
                            className="w-full px-3 py-2 bg-zinc-900 border border-white/10 rounded-lg text-xs text-zinc-100"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-mono text-zinc-400 mb-1">Description</label>
                        <textarea
                          value={exp.description}
                          onChange={(e) => {
                            const updated = [...localData.experiences];
                            updated[index].description = e.target.value;
                            setLocalData((prev: any) => ({ ...prev, experiences: updated }));
                          }}
                          rows={3}
                          className="w-full px-3 py-2 bg-zinc-900 border border-white/10 rounded-lg text-xs text-zinc-100 resize-none"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* PROJECTS TAB */}
            {activeTab === "projects" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-white">Edit Projects</h2>
                  <button
                    onClick={addProject}
                    className="px-3 py-1.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-500 text-xs font-medium rounded-lg flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <Plus size={14} /> Add Project
                  </button>
                </div>

                <div className="space-y-6">
                  {localData.projects.map((project: any, index: number) => (
                    <div key={index} className="p-4 bg-zinc-950/50 border border-white/5 rounded-2xl space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono text-amber-500">Project #{index + 1}</span>
                        <button
                          onClick={() => deleteProject(index)}
                          className="text-red-500 hover:text-red-400 p-1 rounded hover:bg-red-500/10 transition-colors cursor-pointer"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-[10px] font-mono text-zinc-400 mb-1">Title</label>
                          <input
                            type="text"
                            value={project.title}
                            onChange={(e) => {
                              const updated = [...localData.projects];
                              updated[index].title = e.target.value;
                              setLocalData((prev: any) => ({ ...prev, projects: updated }));
                            }}
                            className="w-full px-3 py-2 bg-zinc-900 border border-white/10 rounded-lg text-xs text-zinc-100"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-mono text-zinc-400 mb-1">Category</label>
                          <input
                            type="text"
                            value={project.category}
                            onChange={(e) => {
                              const updated = [...localData.projects];
                              updated[index].category = e.target.value;
                              setLocalData((prev: any) => ({ ...prev, projects: updated }));
                            }}
                            className="w-full px-3 py-2 bg-zinc-900 border border-white/10 rounded-lg text-xs text-zinc-100"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-mono text-zinc-400 mb-1">Tech Stack</label>
                          <input
                            type="text"
                            value={project.tech}
                            onChange={(e) => {
                              const updated = [...localData.projects];
                              updated[index].tech = e.target.value;
                              setLocalData((prev: any) => ({ ...prev, projects: updated }));
                            }}
                            className="w-full px-3 py-2 bg-zinc-900 border border-white/10 rounded-lg text-xs text-zinc-100"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] font-mono text-zinc-400 mb-1">GitHub Link</label>
                          <input
                            type="text"
                            value={project.github}
                            onChange={(e) => {
                              const updated = [...localData.projects];
                              updated[index].github = e.target.value;
                              setLocalData((prev: any) => ({ ...prev, projects: updated }));
                            }}
                            className="w-full px-3 py-2 bg-zinc-900 border border-white/10 rounded-lg text-xs text-zinc-100"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-mono text-zinc-400 mb-1">Demo Link</label>
                          <input
                            type="text"
                            value={project.demo}
                            onChange={(e) => {
                              const updated = [...localData.projects];
                              updated[index].demo = e.target.value;
                              setLocalData((prev: any) => ({ ...prev, projects: updated }));
                            }}
                            className="w-full px-3 py-2 bg-zinc-900 border border-white/10 rounded-lg text-xs text-zinc-100"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-mono text-zinc-400 mb-1">Description</label>
                        <textarea
                          value={project.description}
                          onChange={(e) => {
                            const updated = [...localData.projects];
                            updated[index].description = e.target.value;
                            setLocalData((prev: any) => ({ ...prev, projects: updated }));
                          }}
                          rows={2}
                          className="w-full px-3 py-2 bg-zinc-900 border border-white/10 rounded-lg text-xs text-zinc-100 resize-none"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CERTIFICATIONS TAB */}
            {activeTab === "certifications" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-white">Edit Certifications</h2>
                  <button
                    onClick={addCertification}
                    className="px-3 py-1.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-500 text-xs font-medium rounded-lg flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <Plus size={14} /> Add Cert
                  </button>
                </div>

                <div className="space-y-4">
                  {localData.certifications.map((cert: any, index: number) => (
                    <div key={index} className="p-4 bg-zinc-950/50 border border-white/5 rounded-2xl space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono text-amber-500">Certification #{index + 1}</span>
                        <button
                          onClick={() => deleteCertification(index)}
                          className="text-red-500 hover:text-red-400 p-1 rounded hover:bg-red-500/10 transition-colors cursor-pointer"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] font-mono text-zinc-400 mb-1">Title</label>
                          <input
                            type="text"
                            value={cert.title}
                            onChange={(e) => {
                              const updated = [...localData.certifications];
                              updated[index].title = e.target.value;
                              setLocalData((prev: any) => ({ ...prev, certifications: updated }));
                            }}
                            className="w-full px-3 py-2 bg-zinc-900 border border-white/10 rounded-lg text-xs text-zinc-100"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-mono text-zinc-400 mb-1">Issuer</label>
                          <input
                            type="text"
                            value={cert.issuer}
                            onChange={(e) => {
                              const updated = [...localData.certifications];
                              updated[index].issuer = e.target.value;
                              setLocalData((prev: any) => ({ ...prev, certifications: updated }));
                            }}
                            className="w-full px-3 py-2 bg-zinc-900 border border-white/10 rounded-lg text-xs text-zinc-100"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] font-mono text-zinc-400 mb-1">Verification Link</label>
                          <input
                            type="text"
                            value={cert.verificationLink}
                            onChange={(e) => {
                              const updated = [...localData.certifications];
                              updated[index].verificationLink = e.target.value;
                              setLocalData((prev: any) => ({ ...prev, certifications: updated }));
                            }}
                            className="w-full px-3 py-2 bg-zinc-900 border border-white/10 rounded-lg text-xs text-zinc-100"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-mono text-zinc-400 mb-1">Date</label>
                          <input
                            type="text"
                            value={cert.date}
                            onChange={(e) => {
                              const updated = [...localData.certifications];
                              updated[index].date = e.target.value;
                              setLocalData((prev: any) => ({ ...prev, certifications: updated }));
                            }}
                            className="w-full px-3 py-2 bg-zinc-900 border border-white/10 rounded-lg text-xs text-zinc-100"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* BLOGS TAB */}
            {activeTab === "blogs" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-white">Edit Blogs</h2>
                  <button
                    onClick={addBlog}
                    className="px-3 py-1.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-500 text-xs font-medium rounded-lg flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <Plus size={14} /> Add Article
                  </button>
                </div>

                <div className="space-y-4">
                  {localData.blogs.map((blog: any, index: number) => (
                    <div key={index} className="p-4 bg-zinc-950/50 border border-white/5 rounded-2xl space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono text-amber-500">Blog #{index + 1}</span>
                        <button
                          onClick={() => deleteBlog(index)}
                          className="text-red-500 hover:text-red-400 p-1 rounded hover:bg-red-500/10 transition-colors cursor-pointer"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-[10px] font-mono text-zinc-400 mb-1">Title</label>
                          <input
                            type="text"
                            value={blog.title}
                            onChange={(e) => {
                              const updated = [...localData.blogs];
                              updated[index].title = e.target.value;
                              setLocalData((prev: any) => ({ ...prev, blogs: updated }));
                            }}
                            className="w-full px-3 py-2 bg-zinc-900 border border-white/10 rounded-lg text-xs text-zinc-100"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-mono text-zinc-400 mb-1">Category</label>
                          <input
                            type="text"
                            value={blog.category}
                            onChange={(e) => {
                              const updated = [...localData.blogs];
                              updated[index].category = e.target.value;
                              setLocalData((prev: any) => ({ ...prev, blogs: updated }));
                            }}
                            className="w-full px-3 py-2 bg-zinc-900 border border-white/10 rounded-lg text-xs text-zinc-100"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-mono text-zinc-400 mb-1">Date</label>
                          <input
                            type="text"
                            value={blog.date}
                            onChange={(e) => {
                              const updated = [...localData.blogs];
                              updated[index].date = e.target.value;
                              setLocalData((prev: any) => ({ ...prev, blogs: updated }));
                            }}
                            className="w-full px-3 py-2 bg-zinc-900 border border-white/10 rounded-lg text-xs text-zinc-100"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-mono text-zinc-400 mb-1">Excerpt</label>
                        <textarea
                          value={blog.excerpt}
                          onChange={(e) => {
                            const updated = [...localData.blogs];
                            updated[index].excerpt = e.target.value;
                            setLocalData((prev: any) => ({ ...prev, blogs: updated }));
                          }}
                          rows={2}
                          className="w-full px-3 py-2 bg-zinc-900 border border-white/10 rounded-lg text-xs text-zinc-100 resize-none"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ACHIEVEMENTS TAB */}
            {activeTab === "achievements" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-white">Edit Achievements</h2>
                  <button
                    onClick={addAchievement}
                    className="px-3 py-1.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-500 text-xs font-medium rounded-lg flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <Plus size={14} /> Add Item
                  </button>
                </div>

                <div className="space-y-4">
                  {localData.achievements.map((ach: any, index: number) => (
                    <div key={index} className="p-4 bg-zinc-950/50 border border-white/5 rounded-2xl space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono text-amber-500">Achievement #{index + 1}</span>
                        <button
                          onClick={() => deleteAchievement(index)}
                          className="text-red-500 hover:text-red-400 p-1 rounded hover:bg-red-500/10 transition-colors cursor-pointer"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="md:col-span-2">
                          <label className="block text-[10px] font-mono text-zinc-400 mb-1">Title</label>
                          <input
                            type="text"
                            value={ach.title}
                            onChange={(e) => {
                              const updated = [...localData.achievements];
                              updated[index].title = e.target.value;
                              setLocalData((prev: any) => ({ ...prev, achievements: updated }));
                            }}
                            className="w-full px-3 py-2 bg-zinc-900 border border-white/10 rounded-lg text-xs text-zinc-100"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-mono text-zinc-400 mb-1">Date</label>
                          <input
                            type="text"
                            value={ach.date}
                            onChange={(e) => {
                              const updated = [...localData.achievements];
                              updated[index].date = e.target.value;
                              setLocalData((prev: any) => ({ ...prev, achievements: updated }));
                            }}
                            className="w-full px-3 py-2 bg-zinc-900 border border-white/10 rounded-lg text-xs text-zinc-100"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-mono text-zinc-400 mb-1">Description</label>
                        <textarea
                          value={ach.description}
                          onChange={(e) => {
                            const updated = [...localData.achievements];
                            updated[index].description = e.target.value;
                            setLocalData((prev: any) => ({ ...prev, achievements: updated }));
                          }}
                          rows={2}
                          className="w-full px-3 py-2 bg-zinc-900 border border-white/10 rounded-lg text-xs text-zinc-100 resize-none"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
