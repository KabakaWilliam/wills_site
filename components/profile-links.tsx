type Profile = "email" | "scholar" | "github" | "linkedin" | "x";

const icons: Record<Profile, { color: string; paths: { fill: string; d: string }[] }> = {
  email: { color: "#886c36", paths: [
    { fill: "currentColor", d: "M1 3h14v10H1z" },
    { fill: "#faedbd", d: "M2 4h12v8H2z" },
    { fill: "currentColor", d: "M2 4h2v2H2zm2 2h2v2H4zm2 2h4v2H6zm4-2h2v2h-2zm2-2h2v2h-2z" },
  ] },
  scholar: { color: "#446959", paths: [
    { fill: "currentColor", d: "M6 2h4v1h2v1h2v1h2v2h-2v1h-2v1h-2v1H6V9H4V8H2V7H0V5h2V4h2V3h2zM3 10h3v1h4v-1h3v3h-2v1H5v-1H3z" },
    { fill: "#d4ad59", d: "M7 5h2v2H7zm7 3h1v3h1v3h-3v-3h1z" },
  ] },
  github: { color: "#716080", paths: [
    { fill: "currentColor", d: "M2 1h3v2h6V1h3v7h-1v2h-2v2h1v3H5v-2H3v-1H1v-2h2v1h3v-1H3V8H2z" },
    { fill: "#eee5f0", d: "M4 5h8v3h-1v1H5V8H4z" },
    { fill: "currentColor", d: "M5 5h1v2H5zm5 0h1v2h-1z" },
  ] },
  linkedin: { color: "#4f7390", paths: [
    { fill: "currentColor", d: "M2 1h12v1h1v12h-1v1H2v-1H1V2h1z" },
    { fill: "#f5f8f6", d: "M4 4h2v2H4zm0 3h2v5H4zm4 0h2v1h1V7h1v1h1v4h-2V9h-1v3H8z" },
  ] },
  x: { color: "#535953", paths: [
    { fill: "currentColor", d: "M2 2h3v2H2zm3 2h2v2H5zm2 2h2v2H7zm2 2h2v2H9zm2 2h2v2h-2zm2 2h2v2h-2zM12 2h2v2h-2zm-2 2h2v2h-2zM6 8h2v2H6zm-2 2h2v2H4zm-2 2h2v2H2z" },
  ] },
};

export function ProfilePixel({ name }: { name: Profile }) {
  const icon = icons[name];
  return (
    <svg className="profile-pixel" viewBox="0 0 16 16" width="16" height="16"
      style={{ color: icon.color }} aria-hidden="true" focusable="false">
      {icon.paths.map((path, index) => <path key={index} {...path} />)}
    </svg>
  );
}

const profiles: { name: Profile; label: string; href: string }[] = [
  { name: "email", label: "Email", href: "mailto:william.lugoloobi@oii.ox.ac.uk" },
  { name: "scholar", label: "Google Scholar", href: "https://scholar.google.com/citations?user=_lcpYZkAAAAJ&hl=en" },
  { name: "github", label: "GitHub", href: "https://github.com/KabakaWilliam" },
  { name: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/in/wlugoloobi/" },
  { name: "x", label: "X", href: "https://x.com/William__Gitta" },
];

export function ProfileLinks({ className = "profile-links" }: { className?: string }) {
  return (
    <div className={className} aria-label="Contact and profiles">
      {profiles.map(({ name, label, href }) => (
        <a key={name} href={href}>
          <ProfilePixel name={name} /><span>{label}</span>
        </a>
      ))}
    </div>
  );
}
