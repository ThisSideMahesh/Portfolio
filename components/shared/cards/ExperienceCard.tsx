import React from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card/Card';
import { Badge } from '@/components/ui/badge/Badge';
import { Experience } from '@/types/entities';

interface ExperienceCardProps {
  experience: Experience;
}

export function ExperienceCard({ experience }: ExperienceCardProps) {
  const { company, role, location, startDate, endDate, isCurrent, achievements } = experience.metadata;

  return (
    <Card className="hover:border-zinc-800 transition-colors">
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-lg font-bold text-zinc-100">{role}</h3>
            <p className="text-sm font-semibold text-zinc-400">{company}</p>
          </div>
          <div className="flex flex-col sm:items-end gap-1.5">
            <Badge variant="accent">
              {startDate} — {isCurrent ? 'Present' : endDate}
            </Badge>
            <span className="text-xs text-zinc-500 font-mono">{location}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ul className="list-disc pl-4 space-y-2 text-sm text-zinc-400 leading-relaxed">
          {achievements.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
