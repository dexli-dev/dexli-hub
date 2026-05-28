# Multi-stage build: tiny final image, full devDeps only during build.
# Single-command build (`docker build .`) + single-command run.
#
# Hub is content-only — no @dexli/family submodule consumer (D2 scope is
# apex page; cross-sibling URL composition is cycle-3/D3 territory). So
# this Dockerfile is the SIMPLE shape (no stage-0 submodule fetch, no
# postinstall git ops). If/when D3 or future hub iterations add a
# dexli-family dependency, fold in the multi-stage submodule fetch
# pattern from tinywebhook's cycle-3-recovered Dockerfile.

# ---- Build stage ----------------------------------------------------------
FROM node:22-alpine AS build
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund

COPY . .
RUN npm run build

RUN npm prune --omit=dev

# ---- Runtime stage --------------------------------------------------------
FROM node:22-alpine AS runtime
WORKDIR /app

LABEL org.opencontainers.image.title="dexli" \
      org.opencontainers.image.description="dexli.dev apex hub — anti-IDE tiny tools, URL-shareable state, no accounts." \
      org.opencontainers.image.source="https://github.com/Milkslayer/dexli-hub" \
      org.opencontainers.image.licenses="UNLICENSED"

ENV NODE_ENV=production \
    HOST=0.0.0.0 \
    PORT=3000

COPY --from=build /app/build ./build
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./

EXPOSE 3000

USER node

CMD ["node", "build"]
