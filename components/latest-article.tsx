export function LatestArticle() {
  return (
    <section className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
          <span>Research</span>
        </h2>

        <a
          href="https://arxiv.org/abs/2602.09924"
          target="_blank"
          className="block group"
        >
          <div className="grid md:grid-cols-2 gap-8 pb-10 cursor-pointer hover:opacity-80 transition-opacity">
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-lg mb-3 group-hover:text-[#006F4F] transition-colors">
                  → LLMs Encode Their Failures: Predicting Success from
                  Pre-Generation Activations
                </h3>
                <p className="text-sm text-muted-foreground">
                  LLMs' internal representations can predict problem difficulty
                  and enable efficient inference routing that reduces costs
                  while maintaining performance.
                </p>
              </div>

              <div className="text-xs font-mono text-muted-foreground">
                10th February, 2026
              </div>
            </div>

            <div className="rounded bg-card h-64 md:h-auto flex items-center justify-center font-mono text-muted-foreground">
              <img
                src="/MATH_paretto.png"
                alt=""
                className="max-w-xs md:max-w-sm object-contain h-64"
              />
            </div>
          </div>
        </a>
        <a
          href="https://arxiv.org/abs/2510.18147"
          target="_blank"
          className="block group"
        >
          <div className="grid md:grid-cols-2 gap-8 cursor-pointer hover:opacity-80 transition-opacity">
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-lg mb-3 group-hover:text-[#006F4F] transition-colors">
                  → LLMs Encode How Difficult Problems Are
                </h3>
                <p className="text-sm text-muted-foreground">
                  We show that LLMs linearly represent the difficulty of math
                  and coding problems.
                </p>
              </div>

              <div className="text-xs font-mono text-muted-foreground">
                20th October, 2025
              </div>
            </div>

            <div className="rounded bg-card h-30 md:h-auto flex items-center justify-center font-mono text-muted-foreground">
              <img
                src="/full_probe_comparison_scale.png"
                alt=""
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </a>
      </div>

      {/* <div className="flex justify-center pt-4">
        <button className="px-4 py-2 border-2 border-foreground hover:bg-foreground hover:text-background transition-colors rounded font-medium text-sm">
          View More
        </button>
      </div> */}
    </section>
  );
}
