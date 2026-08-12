# William Lugoloobi — personal site

The homepage content shared by the research and news sections lives in
`lib/site-content.ts`. Add a paper there once; the research list and future
content tooling can consume the same typed record.

## Keeping the CV current

Every CV link on the site points to `/cv`. By default this redirects to the PDF
in `public/`, so old bookmarks remain valid. To serve the current compiled CV
without replacing that file on every update, set this deployment environment
variable:

```text
CV_PDF_URL=https://your-stable-direct-link-to/the-latest-cv.pdf
```

Recommended options:

1. Publish the compiled PDF from the CV's GitHub repository (for example as a
   release asset) and use its stable URL as `CV_PDF_URL`.
2. If the Overleaf project has Git integration, pull/compile it in CI and
   publish the resulting PDF at a stable URL. Overleaf Git/GitHub integration is
   a premium feature, and Overleaf-to-GitHub sync is initiated from Overleaf
   rather than fully automatic.

Do not put an Overleaf authentication token in `CV_PDF_URL` or commit one to
this repository.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
