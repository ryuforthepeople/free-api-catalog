# Free API Catalog

Curated catalog of 500+ free APIs for developers. Search, filter, and discover APIs for your next project.

**Live:** [free-api-catalog.pages.dev](https://free-api-catalog.pages.dev)

## Tech Stack

- **Nuxt 3** — Vue framework with static generation
- **Cloudflare Pages** — Edge deployment via [@for-the-people/deploy-core](https://github.com/ryuforthepeople/deploy)

## Development

```bash
pnpm install
pnpm dev
```

## Build & Deploy

```bash
pnpm generate          # Static build → .output/public/
pnpm deploy            # Generate + deploy to Cloudflare Pages
```

## Data

API data lives in `data/apis.json` — structured, typed, easy to update.

Categories are auto-derived in `data/categories.json`.

## Contributing

Found a missing API or incorrect info? Open an issue or PR.

## Part of

[For the People](https://forthepeople.nl) — building tools and software to help people.
