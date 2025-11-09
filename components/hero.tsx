export function Hero() {
  return (
    <section className="grid md:grid-cols-2 gap-12 items-start">
      {/* Image section - shows first on mobile, second on desktop */}
      <div className="flex justify-center md:justify-end order-1 md:order-2">
        <div className="w-48 h-48 md:w-80 md:h-80 bg-card  border-border rounded flex items-center justify-center font-mono text-xs text-center p-4">
          <span className="text-muted-foreground">
            <img src="/hero_pic.jpg" alt="" />
          </span>
        </div>
      </div>

      {/* Text section - shows second on mobile, first on desktop */}
      <div className="space-y-8 order-2 md:order-1">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-balance">
            Hi I'm William
          </h1>
          <div className="space-y-10 md:space-y-3 text-sm md:text-lg">
            <p>
              I'm a 2nd-year PhD student at the University of Oxford advised by{" "}
              <a
                className="text-[#006F4F]"
                href="https://www.oii.ox.ac.uk/people/profiles/joss-wright/"
              >
                Joss Wright
              </a>{" "}
              and{" "}
              <a
                className="text-[#006F4F]"
                href="https://www.oii.ox.ac.uk/people/profiles/chris-russell/"
              >
                Chris Russell
              </a>{" "}
              . My work ensures that AI agents remain safe and on-task as they
              solve long-horizon tasks.
            </p>
            <p>
              I'm a Rhodes Scholar with a Master's in Data Science from Oxford
              and a BSc from Northwestern University.
            </p>
            <p>
              Contact me by email at{" "}
              <span className="font-mono ">
                X<span className="text-[#006F4F]">@</span>Y
              </span>{" "}
              where{" "}
              <span className="font-mono ">
                X<span className="text-[#006F4F]">=</span>william.lugoloobi
              </span>{" "}
              and{" "}
              <span className="font-mono ">
                Y<span className="text-[#006F4F]">=</span>oii.ox.ac.uk
              </span>
            </p>
          </div>
        </div>
        {/* 
        <button className="px-4 py-2 bg-primary text-primary-foreground rounded font-medium text-sm hover:opacity-90 transition-opacity">
          Projects → text-[#006F4F]
        </button> */}
      </div>
    </section>
  );
}
