# dexli.dev — apex hub

The canonical entry point for the [dexli.dev](https://dexli.dev)
anti-IDE tiny-tools family. Index of shipped tools, anti-IDE positioning,
sibling links.

Family of tools:
- [webhook.dexli.dev](https://webhook.dexli.dev) — temporary webhook inbox
- [cron.dexli.dev](https://cron.dexli.dev) — cron expression parser + preview
- [regex.dexli.dev](https://regex.dexli.dev) — live regex tester

## Develop

```sh
npm install
npm run dev
```

## Build + run with Docker

```sh
docker build -t dexli-hub .
docker run --rm -p 3000:3000 dexli-hub
```

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for the commit convention
(subject prefix + `Engineer:` body trailer). Bar item 11 worker
attribution applies; this is a single-repo cycle (D2) so standard
N-scaling governs (large-N ratio gate, small-N substance gate).
