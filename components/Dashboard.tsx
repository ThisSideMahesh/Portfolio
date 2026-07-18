"use client";

import React, { useState, useEffect } from "react";
import { 
  Briefcase, Code, Award, GraduationCap, Users, Calendar, 
  BookOpen, Download, Link as LinkIcon, MapPin, Mail, Phone, 
  Play, BookOpenCheck, Search, Flame, 
  ExternalLink, Sparkles, User, Terminal, Cpu, Shield
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

const GithubIcon = ({ size = 16, className = "" }: { size?: number; className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ size = 16, className = "" }: { size?: number; className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function Dashboard({ portfolioData }: { portfolioData: any }) {
  const [data, setData] = useState<any>(portfolioData);
  const [selectedProjectCategory, setSelectedProjectCategory] = useState("All");
  const [blogSearch, setBlogSearch] = useState("");
  const [selectedBlogTag, setSelectedBlogTag] = useState("All");
  const [visitorCount, setVisitorCount] = useState(1);
  const [isContactSent, setIsContactSent] = useState(false);

  // Visitor Counter (LocalStorage backed)
  useEffect(() => {
    const visits = localStorage.getItem("visits");
    const count = visits ? parseInt(visits, 10) + 1 : 124;
    localStorage.setItem("visits", count.toString());
    setVisitorCount(count);
  }, []);

  const triggerConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.8 },
      colors: ["#f59e0b", "#d97706", "#ffffff"]
    });
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsContactSent(true);
    setTimeout(() => {
      setIsContactSent(false);
    }, 4000);
  };

  // Extract unique blog tags
  const allBlogTags = ["All", ...Array.from(new Set(data.blogs.flatMap((b: any) => b.tags)))] as string[];

  // Filtered lists
  const filteredProjects = selectedProjectCategory === "All" 
    ? data.projects 
    : data.projects.filter((p: any) => p.category.toLowerCase().includes(selectedProjectCategory.toLowerCase()) || p.tech.toLowerCase().includes(selectedProjectCategory.toLowerCase()));

  const filteredBlogs = data.blogs.filter((b: any) => {
    const matchesSearch = b.title.toLowerCase().includes(blogSearch.toLowerCase()) || b.excerpt.toLowerCase().includes(blogSearch.toLowerCase());
    const matchesTag = selectedBlogTag === "All" || b.tags.includes(selectedBlogTag);
    return matchesSearch && matchesTag;
  });

  return (
    <div className="w-full min-h-screen bg-[#020202] text-zinc-100 font-sans">
      
      {/* 1. Saffron Spiritual Dedicated Banner */}
      <div className="w-full bg-gradient-to-r from-amber-600/10 via-amber-500/20 to-amber-600/10 border-b border-amber-500/20 py-2.5 text-center">
        <motion.p 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-xs md:text-sm font-semibold tracking-[0.2em] text-amber-500 saffron-glow uppercase"
        >
          {data.personal.spiritualDedication}
        </motion.p>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-20 grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-start">
        
        {/* ================= LEFT PROFILE SIDEBAR (Sticky) ================= */}
        <div className="lg:col-span-4 lg:sticky lg:top-8 space-y-6">
          <div className="glass-panel p-6 md:p-8 rounded-3xl border border-white/5 flex flex-col items-center text-center relative overflow-hidden">
            {/* Top Glowing Ambient Saffron Ring */}
            <div className="absolute -top-24 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl" />
            
            {/* User Photo */}
            <div className="relative w-36 h-36 md:w-44 md:h-44 rounded-2xl overflow-hidden border border-white/10 mb-6 group">
              <img 
                src={data.personal.photo} 
                alt={data.personal.name} 
                className="w-full h-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
            </div>

            {/* Name & Credentials */}
            <h1 className="text-xl md:text-2xl font-bold tracking-tight text-white">{data.personal.name}</h1>
            <p className="text-xs text-amber-500 font-mono mt-1 uppercase tracking-wider">{data.personal.role}</p>
            <p className="text-zinc-400 text-xs leading-relaxed mt-4 max-w-sm">
              "{data.personal.tagline}"
            </p>

            <div className="w-full h-[1px] bg-white/10 my-6" />

            {/* Contact Details */}
            <div className="w-full text-left space-y-3.5 text-xs text-zinc-300">
              <div className="flex items-center gap-3">
                <MapPin size={14} className="text-amber-500 shrink-0" />
                <span>{data.personal.location}</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={14} className="text-amber-500 shrink-0" />
                <a href={`mailto:${data.personal.socials.email}`} className="hover:text-amber-500 transition-colors">
                  {data.personal.socials.email}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={14} className="text-amber-500 shrink-0" />
                <a href={`tel:${data.personal.socials.phone}`} className="hover:text-amber-500 transition-colors">
                  {data.personal.socials.phone}
                </a>
              </div>
            </div>

            <div className="w-full h-[1px] bg-white/10 my-6" />

            {/* Social Grid */}
            <div className="flex flex-wrap justify-center gap-3 w-full">
              <a href={data.personal.socials.github} target="_blank" className="p-2.5 bg-zinc-900 hover:bg-zinc-800 border border-white/5 rounded-xl transition-all hover:text-amber-500 text-zinc-300 cursor-pointer">
                <GithubIcon size={16} />
              </a>
              <a href={data.personal.socials.linkedin} target="_blank" className="p-2.5 bg-zinc-900 hover:bg-zinc-800 border border-white/5 rounded-xl transition-all hover:text-amber-500 text-zinc-300 cursor-pointer">
                <LinkedinIcon size={16} />
              </a>
              <a href={data.personal.socials.youtube} target="_blank" className="p-2.5 bg-zinc-900 hover:bg-zinc-800 border border-white/5 rounded-xl transition-all hover:text-amber-500 text-zinc-300 cursor-pointer">
                <Play size={16} />
              </a>
              <a href={data.personal.socials.leetcode} target="_blank" className="px-3 py-1.5 bg-zinc-900 hover:bg-zinc-800 border border-white/5 rounded-xl transition-all hover:text-amber-500 text-zinc-300 font-mono text-[10px] cursor-pointer">
                LeetCode
              </a>
            </div>
          </div>

          {/* Spotify & Stats Panel */}
          <div className="glass-panel p-6 rounded-3xl border border-white/5 space-y-5">
            {/* Spotify Simulated Now Playing */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 animate-pulse">
                  <Play size={16} fill="currentColor" />
                </div>
                <div>
                  <p className="text-[10px] text-zinc-500 font-mono uppercase tracking-wider">Now Playing</p>
                  <p className="text-xs font-bold text-white tracking-tight">Swami Samarth Jap</p>
                </div>
              </div>
              {/* Animated Equalizer */}
              <div className="flex items-end gap-[3px] h-3">
                {[...Array(4)].map((_, i) => (
                  <motion.div 
                    key={i}
                    animate={{ height: [4, 12, 4] }}
                    transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
                    className="w-[2px] bg-emerald-500 rounded-full"
                  />
                ))}
              </div>
            </div>

            <div className="h-[1px] bg-white/10" />

            {/* Coding Stats Summary */}
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="p-3 bg-zinc-900/40 rounded-2xl border border-white/5">
                <p className="text-[10px] text-zinc-500 font-mono uppercase">GitHub commits</p>
                <p className="text-lg font-bold text-white mt-1">450+ YTD</p>
              </div>
              <div className="p-3 bg-zinc-900/40 rounded-2xl border border-white/5">
                <p className="text-[10px] text-zinc-500 font-mono uppercase">Visitor Counter</p>
                <p className="text-lg font-bold text-amber-500 mt-1">{visitorCount}</p>
              </div>
            </div>
          </div>
        </div>

        {/* ================= RIGHT SCROLLABLE CONTENT ================= */}
        <div className="lg:col-span-8 space-y-16">
          
          {/* ABOUT SECTION */}
          <section id="about" className="space-y-6">
            <div className="flex items-center gap-2 text-amber-500">
              <User size={18} />
              <span className="text-xs font-mono tracking-widest uppercase">About Mahesh</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white">The Engineering Journey</h2>
            <div className="p-6 md:p-8 glass-panel rounded-3xl border border-white/5 space-y-6">
              <p className="text-zinc-300 text-sm md:text-base leading-relaxed">
                As a Computer Science Engineering student, my path has been defined by moving beyond classroom theories. 
                I started by troubleshooting local hardware configurations, which built a deep respect for physical operating limits. 
                From overcoming initial academic hurdles, I pushed into competitive hackathons (taking first place in CogniSphere), 
                and secured core DevOps and Linux system administrator roles.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-4 bg-zinc-900/30 rounded-2xl border border-white/5 flex gap-3">
                  <Cpu className="text-amber-500 shrink-0" size={16} />
                  <div>
                    <h4 className="font-bold text-white">Leadership Driven</h4>
                    <p className="text-zinc-400 mt-1">President of the T&P Cell, organizing student bootcamps and placement training drives.</p>
                  </div>
                </div>
                <div className="p-4 bg-zinc-900/30 rounded-2xl border border-white/5 flex gap-3">
                  <Terminal className="text-amber-500 shrink-0" size={16} />
                  <div>
                    <h4 className="font-bold text-white">Linux & Automation</h4>
                    <p className="text-zinc-400 mt-1">RHCSA Certified, building secure infrastructure, Bash automated scripts, and Docker images.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* EXPERIENCE SECTION */}
          <section id="experience" className="space-y-6">
            <div className="flex items-center gap-2 text-amber-500">
              <Briefcase size={18} />
              <span className="text-xs font-mono tracking-widest uppercase">Career Timeline</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white">Roles & Leadership</h2>
            
            <div className="relative border-l border-zinc-800 ml-4 pl-6 md:pl-8 space-y-10">
              {data.experiences.map((exp: any, index: number) => (
                <div key={index} className="relative">
                  {/* Timeline bullet dot */}
                  <div className="absolute -left-[31px] md:-left-[39px] top-1.5 w-2.5 h-2.5 bg-amber-500 rounded-full ring-4 ring-amber-500/10 shadow-[0_0_10px_rgba(245,158,11,0.5)]" />
                  
                  <div className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest">{exp.period}</div>
                  <h3 className="text-xl font-bold text-white mt-1">{exp.role}</h3>
                  <h4 className="text-xs text-amber-500 font-mono">{exp.company}</h4>
                  <p className="text-zinc-400 text-xs md:text-sm mt-3 leading-relaxed max-w-2xl">{exp.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* PROJECTS SECTION */}
          <section id="projects" className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-amber-500">
                <Code size={18} />
                <span className="text-xs font-mono tracking-widest uppercase">Software Showcase</span>
              </div>
              
              {/* Category Filter */}
              <div className="flex gap-2">
                {["All", "Featured"].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedProjectCategory(cat)}
                    className={`px-3 py-1 text-[10px] font-mono rounded-lg transition-colors cursor-pointer ${
                      selectedProjectCategory === cat
                        ? "bg-amber-500 text-[#020202] font-semibold"
                        : "bg-zinc-900 text-zinc-400 hover:text-zinc-200"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
            
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white">Featured Projects</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredProjects.map((project: any, index: number) => (
                <div key={index} className="glass-card p-6 rounded-3xl flex flex-col justify-between h-[280px]">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 text-[9px] font-mono tracking-wider text-[#020202] bg-amber-500 rounded uppercase">
                        {project.category}
                      </span>
                      <span className="text-[10px] text-zinc-500 font-mono">{project.status}</span>
                    </div>
                    <h3 className="text-xl font-bold text-white mt-4">{project.title}</h3>
                    <p className="text-zinc-400 text-xs mt-2 leading-relaxed line-clamp-3">{project.description}</p>
                  </div>
                  
                  <div>
                    <p className="text-[10px] font-mono text-zinc-500 mb-4">{project.tech}</p>
                    <div className="flex gap-4">
                      <a href={project.github} target="_blank" className="text-zinc-300 hover:text-white flex items-center gap-1.5 text-xs font-medium cursor-pointer">
                        <GithubIcon size={14} /> Code
                      </a>
                      <a href={project.demo} target="_blank" className="text-zinc-300 hover:text-white flex items-center gap-1.5 text-xs font-medium cursor-pointer">
                        <ExternalLink size={14} /> Live
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* CERTIFICATIONS */}
          <section id="certifications" className="space-y-6">
            <div className="flex items-center gap-2 text-amber-500">
              <Award size={18} />
              <span className="text-xs font-mono tracking-widest uppercase">Credentials</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white">Certifications</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {data.certifications.map((cert: any, index: number) => (
                <div 
                  key={index}
                  onClick={triggerConfetti} 
                  className="glass-card p-4 rounded-2xl border border-white/5 flex flex-col justify-between h-[150px] cursor-pointer hover:border-amber-500/30"
                >
                  <div>
                    <h3 className="text-xs font-bold text-white line-clamp-2">{cert.title}</h3>
                    <p className="text-[10px] text-zinc-500 font-mono mt-1">{cert.issuer}</p>
                  </div>
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="text-zinc-400">{cert.date}</span>
                    <a 
                      href={cert.verificationLink} 
                      target="_blank" 
                      onClick={(e) => e.stopPropagation()} 
                      className="text-amber-500 hover:text-amber-400 flex items-center gap-1 cursor-pointer"
                    >
                      Verify <ExternalLink size={10} />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* GOOGLE CLOUD SKILL BADGES */}
          <section id="google-cloud" className="space-y-6">
            <div className="flex items-center gap-2 text-amber-500">
              <Cpu size={18} />
              <span className="text-xs font-mono tracking-widest uppercase">Cloud Labs</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white">Google Cloud Badges ({data.googleCloud.totalBadges}+)</h2>
            <div className="p-6 md:p-8 glass-panel rounded-3xl border border-white/5 space-y-6">
              <p className="text-zinc-300 text-xs md:text-sm leading-relaxed">
                Completed over 64 Google Cloud skill badges and quests on Google Cloud Skills Boost, covering containerized architectures, Kubernetes Engine clusters, and IAM configurations.
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {data.googleCloud.badges.map((badge: any, index: number) => (
                  <div key={index} className="p-3 bg-zinc-950/60 border border-white/5 rounded-xl flex items-center gap-2.5">
                    {/* Google Cloud colored miniature badge representation */}
                    <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-blue-500 via-red-500 to-yellow-500 shrink-0 shadow-sm" />
                    <span className="text-[10px] text-zinc-200 font-medium truncate">{badge}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* HACKATHONS */}
          <section id="hackathons" className="space-y-6">
            <div className="flex items-center gap-2 text-amber-500">
              <Flame size={18} />
              <span className="text-xs font-mono tracking-widest uppercase">Competitive Coding</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white">Hackathons</h2>
            
            <div className="space-y-4">
              {data.hackathons.map((h: any, index: number) => (
                <div key={index} className="p-5 glass-card rounded-2xl border border-white/5 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-white">{h.title}</h3>
                    <p className="text-xs text-zinc-400 mt-1 leading-relaxed max-w-xl">{h.learning}</p>
                  </div>
                  <span className="px-3 py-1 bg-amber-500/10 text-amber-500 text-xs font-semibold rounded-lg shrink-0 font-mono">
                    {h.result}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* WORKSHOPS DELIVERED */}
          <section id="workshops" className="space-y-6">
            <div className="flex items-center gap-2 text-amber-500">
              <GraduationCap size={18} />
              <span className="text-xs font-mono tracking-widest uppercase">Teaching & Talks</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white">Workshops Delivered</h2>
            
            <div className="p-6 md:p-8 glass-panel rounded-3xl border border-white/5 space-y-6">
              {data.workshops.map((w: any, index: number) => (
                <div key={index} className="space-y-4">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                    <h3 className="text-xl font-bold text-white">{w.title}</h3>
                    <span className="text-xs text-zinc-500 font-mono">{w.date}</span>
                  </div>
                  <p className="text-zinc-300 text-xs md:text-sm leading-relaxed">
                    {w.description}
                  </p>
                  
                  <div className="p-4 bg-amber-500/5 rounded-2xl border border-amber-500/10">
                    <h4 className="text-xs font-bold text-amber-500 uppercase tracking-wider">Student Feedback</h4>
                    <p className="text-zinc-300 text-xs mt-1.5 leading-relaxed">"{w.feedback}"</p>
                  </div>

                  <div className="flex gap-4 pt-2">
                    <button onClick={triggerConfetti} className="px-4 py-2 bg-zinc-900 border border-white/10 text-xs rounded-xl flex items-center gap-1.5 hover:text-amber-500 transition-all cursor-pointer">
                      <Download size={12} /> Download Presentation
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* BLOG SYSTEM */}
          <section id="blog" className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-amber-500">
                <BookOpen size={18} />
                <span className="text-xs font-mono tracking-widest uppercase">MDX Articles</span>
              </div>
              <div className="relative w-48 md:w-64">
                <Search className="absolute left-3 top-2.5 text-zinc-500" size={14} />
                <input
                  type="text"
                  value={blogSearch}
                  onChange={(e) => setBlogSearch(e.target.value)}
                  placeholder="Search articles..."
                  className="w-full pl-9 pr-4 py-1.5 bg-zinc-900 border border-white/10 rounded-xl text-xs text-zinc-100 focus:outline-none focus:border-amber-500/50"
                />
              </div>
            </div>

            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white">Technical Blog</h2>
            
            {/* Tags filters */}
            <div className="flex flex-wrap gap-2">
              {allBlogTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedBlogTag(tag)}
                  className={`px-3 py-1 text-[10px] font-mono rounded-lg transition-colors cursor-pointer ${
                    selectedBlogTag === tag
                      ? "bg-amber-500 text-[#020202] font-semibold"
                      : "bg-zinc-900 text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>

            <div className="space-y-4">
              {filteredBlogs.map((blog: any, index: number) => (
                <div key={index} className="p-5 glass-card rounded-2xl border border-white/5 space-y-3">
                  <div className="flex items-center justify-between text-[10px] text-zinc-500 font-mono">
                    <span className="px-2 py-0.5 bg-zinc-800 text-zinc-300 rounded uppercase">{blog.category}</span>
                    <span>{blog.date} • {blog.readingTime}</span>
                  </div>
                  <h3 className="text-lg font-bold text-white hover:text-amber-500 transition-colors cursor-pointer">{blog.title}</h3>
                  <p className="text-zinc-400 text-xs leading-relaxed line-clamp-2">{blog.excerpt}</p>
                </div>
              ))}
            </div>
          </section>

          {/* RESOURCES DOWNLOAD */}
          <section id="resources" className="space-y-6">
            <div className="flex items-center gap-2 text-amber-500">
              <BookOpenCheck size={18} />
              <span className="text-xs font-mono tracking-widest uppercase">Downloads</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white">Interview Notes & Cheat Sheets</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data.resources.map((res: any, index: number) => (
                <div key={index} className="p-4 bg-zinc-900/40 border border-white/5 rounded-2xl flex items-center justify-between gap-4">
                  <div>
                    <h3 className="text-xs font-bold text-white">{res.title}</h3>
                    <p className="text-[10px] text-zinc-400 mt-1 leading-relaxed">{res.description}</p>
                  </div>
                  <button 
                    onClick={triggerConfetti} 
                    className="p-2.5 bg-zinc-800 hover:bg-zinc-700 text-amber-500 rounded-xl transition-colors cursor-pointer"
                  >
                    <Download size={14} />
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* ACHIEVEMENTS / SPORTS */}
          <section id="achievements" className="space-y-6">
            <div className="flex items-center gap-2 text-amber-500">
              <Award size={18} />
              <span className="text-xs font-mono tracking-widest uppercase">Recognitions</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white">Achievements & Sports</h2>
            
            <div className="space-y-4">
              {data.achievements.map((ach: any, index: number) => (
                <div key={index} className="p-4 bg-zinc-900/20 border border-white/5 rounded-2xl flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-500 shrink-0">
                    <Award size={16} />
                  </div>
                  <div>
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-1 w-full">
                      <h3 className="text-sm font-bold text-white">{ach.title}</h3>
                      <span className="text-[10px] text-zinc-500 font-mono">{ach.date}</span>
                    </div>
                    <p className="text-zinc-400 text-xs mt-1.5 leading-relaxed">{ach.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* TESTIMONIALS */}
          <section id="testimonials" className="space-y-6">
            <div className="flex items-center gap-2 text-amber-500">
              <Users size={18} />
              <span className="text-xs font-mono tracking-widest uppercase">Endorsements</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white">Testimonials</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {data.testimonials.map((test: any, index: number) => (
                <div key={index} className="p-5 glass-panel rounded-2xl border border-white/5 flex flex-col justify-between h-[200px]">
                  <p className="text-zinc-300 text-xs italic leading-relaxed line-clamp-5">
                    "{test.content}"
                  </p>
                  <div className="mt-4">
                    <h4 className="text-xs font-bold text-white">{test.name}</h4>
                    <p className="text-[10px] text-zinc-500 font-mono mt-0.5">{test.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* CONTACT FORM */}
          <section id="contact" className="space-y-6">
            <div className="flex items-center gap-2 text-amber-500">
              <Mail size={18} />
              <span className="text-xs font-mono tracking-widest uppercase">Inquiries</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white">Get in Touch</h2>
            
            <form onSubmit={handleContactSubmit} className="p-6 md:p-8 glass-panel rounded-3xl border border-white/5 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-zinc-400 mb-2">Name</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-2.5 bg-zinc-900 border border-white/10 rounded-xl text-xs text-zinc-100 focus:outline-none focus:border-amber-500/50"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-zinc-400 mb-2">Email</label>
                  <input
                    type="email"
                    required
                    className="w-full px-4 py-2.5 bg-zinc-900 border border-white/10 rounded-xl text-xs text-zinc-100 focus:outline-none focus:border-amber-500/50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-2">Message</label>
                <textarea
                  required
                  rows={4}
                  className="w-full px-4 py-2.5 bg-zinc-900 border border-white/10 rounded-xl text-xs text-zinc-100 focus:outline-none focus:border-amber-500/50 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-[#020202] font-semibold rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-2 text-sm"
              >
                {isContactSent ? "Message Sent Successfully!" : "Send Message"}
              </button>
            </form>
          </section>

        </div>
      </div>
      
    </div>
  );
}
