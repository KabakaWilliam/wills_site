// Small original pixel drawings, matching the profile links and meadow.
export function ProjectPixel({ name }: { name: "pidge" | "terminal" }) {
  return (
    <svg className="project-pixel" viewBox="0 0 24 24" width="40" height="40"
      aria-hidden="true" focusable="false" shapeRendering="crispEdges">
      {name === "pidge" ? <>
        <path fill="#626b78" d="M14 3h5v1h2v6h-2v4h-2v4h-3v2H7v-1H5v-2H3v-2H1v-3h4v-1h7V9h1V5h1z" />
        <path fill="#b5bdc7" d="M14 5h5v5h-2v3h-3v3h-3v2H7v-1H5v-3h6v-2h2V9h1z" />
        <path fill="#8793a4" d="M5 12h7v1h2v3h-3v2H7v-1H5z" />
        <path fill="#e4e2d6" d="M16 5h3v3h-3z" />
        <path fill="#303d44" d="M17 6h1v1h-1zM6 14h5v1H6zm2 2h4v1H8z" />
        <path fill="#527c6b" d="M13 10h5v2h-2v2h-3z" />
        <path fill="#a197b7" d="M14 12h2v2h-2z" />
        <path fill="#b28b52" d="M21 7h2v2h-2zM8 20h1v2H7v1H6v-2h2zm5 0h1v2h2v1h-4v-2h1z" />
      </> : <>
        <path fill="#596b62" d="M2 3h20v1h1v15h-1v1H2v-1H1V4h1z" />
        <path fill="#e7ece2" d="M3 5h18v13H3z" />
        <path fill="#c1ccbe" d="M3 5h18v3H3z" />
        <path fill="#a88c58" d="M4 6h1v1H4z" />
        <path fill="#8d819e" d="M6 6h1v1H6z" />
        <path fill="#53735f" d="M5 10h2v1H5zm2 1h2v2H7zm-2 2h2v1H5zm6 1h6v1h-6z" />
        <path fill="#a7b5a6" d="M4 21h16v1H4z" />
      </>}
    </svg>
  );
}
