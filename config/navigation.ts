export interface NavItem {
  title: string;
  path: string;
  isExternal?: boolean;
}

export const NavigationConfig = {
  header: [
    { title: "About", path: "/about" },
    { title: "Projects", path: "/projects" },
    { title: "Publications", path: "/publications" },
    { title: "Blog", path: "/blog" },
    { title: "Resources", path: "/resources" }
  ] as NavItem[],
  footer: [
    { title: "Experience", path: "/experience" },
    { title: "Skills", path: "/skills" },
    { title: "Leadership", path: "/leadership" },
    { title: "Teaching", path: "/teaching" },
    { title: "Speaking", path: "/speaking" },
    { title: "Contact", path: "/contact" }
  ] as NavItem[],
  resumeUrl: "/assets/resume.pdf"
};
