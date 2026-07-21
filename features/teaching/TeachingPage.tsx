'use client';

import React from 'react';
import { PageShell } from '@/components/shared/PageShell';
import { Card, CardHeader, CardContent } from '@/components/ui/card/Card';
import { Badge } from '@/components/ui/badge/Badge';
import { BookOpen, GraduationCap, Laptop, CheckCircle2 } from 'lucide-react';

export function TeachingPage() {
  const experiences = [
    {
      role: "MS-CIT Trainer",
      organization: "Vighnaharta E-Payment Data Centre",
      period: "Nov 2024 – Jan 2025",
      highlights: [
        "Delivered structured computer fundamentals and MS Office training to 25+ students.",
        "Conducted practical assessment sessions, doubt-solving, and hands-on laboratory exercises.",
        "Created engaging student-friendly learning environments encouraging digital literacy."
      ]
    },
    {
      role: "Technical Student Trainer & Workshop Instructor",
      organization: "Computer Science Student Association & Campus Fests",
      period: "July 2024 – Present",
      highlights: [
        "Conducted 5+ technical workshops on Git, GitHub, Linux CLI, and Shell scripting for 150+ students.",
        "Guided junior students on hackathon preparation, project architecture, and career development.",
        "Created open-source cheatsheets and training resources for computer engineering undergraduates."
      ]
    }
  ];

  const competencies = [
    "Classroom Management",
    "Student Mentoring",
    "Technical Training",
    "Curriculum Delivery",
    "Practical Lab Management",
    "Assessment & Evaluation",
    "Public Speaking",
    "Educational Technology"
  ];

  return (
    <PageShell
      title="Teaching & Technical Training"
      description="Workshops, MS-CIT curriculum delivery, and student mentoring initiatives."
    >
      <div className="space-y-8">
        
        {/* Experience Cards */}
        <div className="grid grid-cols-1 gap-6">
          {experiences.map((exp, index) => (
            <Card key={index} variant="interactive">
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500">
                      <GraduationCap size={20} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-zinc-100">{exp.role}</h3>
                      <p className="text-xs text-amber-500 font-mono">{exp.organization}</p>
                    </div>
                  </div>
                  <Badge variant="accent" className="self-start sm:self-auto">
                    {exp.period}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-zinc-400">
                  {exp.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Teaching Competencies Badge Matrix */}
        <div className="p-6 rounded-2xl border border-zinc-800 bg-zinc-900/40 space-y-4">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-amber-500" />
            <h2 className="text-lg font-bold text-zinc-100">Teaching Competencies</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {competencies.map(comp => (
              <Badge key={comp} variant="outline" className="text-xs py-1 px-3">
                {comp}
              </Badge>
            ))}
          </div>
        </div>

      </div>
    </PageShell>
  );
}
