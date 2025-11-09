export function LatestArticle() {
  return (
    <section className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
          <span>Research</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <h3 className="font-bold text-lg mb-3 cursor-pointer hover:text-[#006F4F]">
                →{" "}
                <a href="https://arxiv.org/abs/2510.18147" target="_blank">
                  LLMs Encode How Difficult Problems Are
                </a>
              </h3>
              <p className="text-sm text-muted-foreground ">
                We show that LLMs linearly represent the difficulty of math and
                coding problems.
              </p>
            </div>

            <div className="text-xs font-mono text-muted-foreground">
              20th October, 2025
            </div>

            {/* <button className="px-4 py-2 bg-primary text-primary-foreground rounded font-medium text-sm hover:opacity-90 transition-opacity">
              View
            </button> */}
          </div>

          <div className=" rounded bg-card h-64 md:h-auto flex items-center justify-center font-mono text-muted-foreground cursor-pointer">
            <img src="/full_probe_comparison_scale.png" alt="" />
          </div>
        </div>
      </div>

      {/* <div className="flex justify-center pt-4">
        <button className="px-4 py-2 border-2 border-foreground hover:bg-foreground hover:text-background transition-colors rounded font-medium text-sm">
          View More
        </button>
      </div> */}
    </section>
  );
}
