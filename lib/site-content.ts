export const papers = [
  {
    title:
      "Known By Their Actions: Fingerprinting LLM Browser Agents via UI Traces",
    abstract:
      "Websites can silently fingerprint which LLM is powering a browser agent just by observing its actions with an embedded tracker.",
    meta: "arXiv:2605.14786 · Computer-use agents · Security",
    date: "May 2026",
    href: "https://arxiv.org/abs/2605.14786",
  },
  {
    title:
      "LLMs Encode Their Failures: Predicting Success from Pre-Generation Activations",
    abstract:
      "Language models’ internal representations contain signal about whether they’ll succeed on a task before generation begins. We use it to route inference efficiently while maintaining performance.",
    meta: "COLM 2026 · Mechanistic interpretability · Inference routing",
    date: "Feb 2026",
    href: "https://arxiv.org/abs/2602.09924",
  },
  {
    title: "LLMs Encode How Difficult Problems Are",
    abstract:
      "LLMs linearly represent the difficulty of math and coding problems in their activation space, with implications for adaptive inference, curriculum learning, and model confidence.",
    meta: "arXiv:2510.18147 · Representation learning · Probing",
    date: "Oct 2025",
    href: "https://arxiv.org/abs/2510.18147",
  },
] as const;

export const news = [
  {
    date: "Aug 2026",
    title: "LLMs Encode Their Failures accepted to COLM",
    body: "Our work shows that models encode whether they will succeed before generation begins, enabling more efficient inference routing.",
    href: "https://arxiv.org/abs/2602.09924",
    linkLabel: "Read the paper",
  },
  {
    date: "3 Aug 2026",
    title: "Joined Thomson Reuters as a Research Scientist Intern",
    body: "Working on post-training and harness optimisation for agents.",
    href: "https://www.thomsonreuters.com/",
    linkLabel: "Thomson Reuters",
  },
  {
    date: "Jul 2026",
    title: "Launched Pidge",
    body: "Search Oxford college roles in one place and follow the opportunities, perks, and deadlines you care about.",
    href: "https://pidge.watch",
    linkLabel: "Visit pidge.watch",
  },
  {
    date: "May 2026",
    title: "New paper on browser-agent fingerprinting",
    body: "We show that websites can identify the model behind an LLM browser agent from its UI traces.",
    href: "https://arxiv.org/abs/2605.14786",
    linkLabel: "Read the paper",
  },
] as const;
