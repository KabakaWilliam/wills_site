export function ProjectsGrid() {
  const projects = Array(8).fill({
    title: "Project",
    cover: "COVER",
  })

  return (
    <section className="space-y-8">
      <h2 className="text-2xl font-bold">Recent Projects</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {projects.map((_, i) => (
          <div
            key={i}
            className="aspect-square border-2 border-border rounded bg-card flex items-center justify-center font-mono text-muted-foreground hover:border-foreground transition-colors cursor-pointer"
          >
            {_.cover}
          </div>
        ))}
      </div>

      <div className="flex justify-center pt-4">
        <button className="px-4 py-2 border-2 border-foreground hover:bg-foreground hover:text-background transition-colors rounded font-medium text-sm">
          View More
        </button>
      </div>
    </section>
  )
}
