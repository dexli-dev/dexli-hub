# Multi-stage build: tiny final image, full devDeps only during build.
#
# dexli.dev apex hub — consumes the @dexli/family library at
# vendored/dexli-family via git submodule. Apex auto-renders the
# tools-index from `FAMILY` filtered by `published === true && apexCard
# !== null` (CEO two-flag lock 2026-05-29 / [[feedback_family_brand_template]]).
# Future ventures inherit the apex card slot by updating dexli-family
# alone — no per-venture apex-page edit.

# ---- Stage 0: fetch dexli-family library at pinned SHA -------------------
# We can't `git submodule update --init` inside the main build stage
# because `.dockerignore` excludes `.git/` (intentional — keeps the
# runtime image slim) and node:22-alpine doesn't ship `git`. A tiny
# alpine stage with `git` does the clone + checkout, and the build
# stage COPYs the result in. Same pattern as tinywebhook + diff-dexli.
#
# The SHA is duplicated between this Dockerfile and .gitmodules /
# git submodule pin. **CTO discipline: when bumping the submodule pin,
# bump DEXLI_FAMILY_SHA in lockstep.** Drift causes a build failure
# (SHA doesn't exist) or behavioral divergence between local-tested
# code and deployed code. Catch at code review.
FROM alpine:3.20 AS submodules
ARG DEXLI_FAMILY_SHA=538bbecea5888bd4897fa73ae83a1c961db8a5d0
RUN apk add --no-cache git
RUN git clone https://github.com/dexli-dev/dexli-family.git /vendored-dexli-family \
    && cd /vendored-dexli-family \
    && git checkout ${DEXLI_FAMILY_SHA} \
    && rm -rf .git

# ---- Stage 1: build the app -----------------------------------------------
FROM node:22-alpine AS build
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund

COPY . .
COPY --from=submodules /vendored-dexli-family ./vendored/dexli-family

RUN npm run build

RUN npm prune --omit=dev

# ---- Stage 2: runtime -----------------------------------------------------
FROM node:22-alpine AS runtime
WORKDIR /app

LABEL org.opencontainers.image.title="dexli" \
      org.opencontainers.image.description="dexli.dev apex hub — anti-IDE tiny tools, URL-shareable state, no accounts." \
      org.opencontainers.image.source="https://github.com/dexli-dev/dexli-hub" \
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
