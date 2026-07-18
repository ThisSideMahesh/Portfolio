'use client';

import React from 'react';
import { PageShell } from '@/components/shared/PageShell';
import { Card, CardHeader, CardContent } from '@/components/ui/card/Card';
import { Grid } from '@/components/layout/Grid';

export function UsesPage() {
  const hardware = [
    { item: 'Lenovo ThinkPad', spec: 'Linux Environment Sandbox (primary OS)' },
    { item: 'Intel Core i5 PC', spec: 'Windows development partition & secondary virtualization node' }
  ];

  const software = [
    { item: 'VS Code', spec: 'Primary code editor with Vim keybindings' },
    { item: 'Neovim', spec: 'Quick CLI file editing & configuration tweaks' },
    { item: 'Terminal (Alacritty / Zsh)', spec: 'Terminal emulator loaded with Oh-My-Zsh & customized aliases' }
  ];

  return (
    <PageShell
      title="My Setup & Gear"
      description="The hardware systems, terminal environments, text editors, and software configurations I use daily."
    >
      <Grid columns={2} gap="md">
        <Card>
          <CardHeader>
            <h3 className="text-base font-bold text-zinc-100">Hardware</h3>
          </CardHeader>
          <CardContent className="text-sm text-zinc-400 pt-2 space-y-4">
            {hardware.map(h => (
              <div key={h.item} className="space-y-1">
                <div className="font-semibold text-zinc-200">{h.item}</div>
                <div className="text-xs text-zinc-500 font-mono">{h.spec}</div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h3 className="text-base font-bold text-zinc-100">Software & Terminals</h3>
          </CardHeader>
          <CardContent className="text-sm text-zinc-400 pt-2 space-y-4">
            {software.map(s => (
              <div key={s.item} className="space-y-1">
                <div className="font-semibold text-zinc-200">{s.item}</div>
                <div className="text-xs text-zinc-500 font-mono">{s.spec}</div>
              </div>
            ))}
          </CardContent>
        </Card>
      </Grid>
    </PageShell>
  );
}
