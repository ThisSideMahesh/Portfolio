export interface AskMaheshService {
  ask(question: string): Promise<string>;
}

export class MockAskMaheshService implements AskMaheshService {
  public async ask(question: string): Promise<string> {
    // Simulate API query latency
    await new Promise(resolve => setTimeout(resolve, 800));

    const q = question.toLowerCase();

    if (q.includes('linux') || q.includes('rhcsa')) {
      return "I am a Red Hat Certified System Administrator (RHCSA). Linux is my primary OS, and I love automation using Bash scripts and Ansible playbooks.";
    }

    if (q.includes('project') || q.includes('code')) {
      return "I build pediatrician tracking portals (CHRI Platform), army management systems, and other full-stack web applications using React, Node.js, and MongoDB.";
    }

    if (q.includes('skills') || q.includes('tech')) {
      return "My core stack includes TypeScript, React, Next.js, Node.js, Express, PostgreSQL, MongoDB, Linux Admin, Git, and Docker.";
    }

    if (q.includes('swami') || q.includes('faith')) {
      return "Built with Discipline. Guided by Faith. श्री स्वामी समर्थ";
    }

    return "Hello! I'm Mahesh's AI assistant. Ask me about his software projects, technical training, Linux administration skills, or student leadership details!";
  }
}
