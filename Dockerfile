# ----------------------------
# Stage 1: Build backend
# ----------------------------
FROM node:22-alpine AS backend-build

# Install pnpm via corepack
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /app/backend

RUN corepack enable && corepack prepare pnpm@latest --activate

COPY backend/package.json backend/pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY backend/ ./
RUN pnpm exec tsc
RUN pnpm prune --prod

# ----------------------------
# Stage 2: Build frontend
# ----------------------------
FROM node:22-alpine AS frontend-build

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

WORKDIR /app/frontend

RUN corepack enable && corepack prepare pnpm@latest --activate

COPY frontend/package.json frontend/pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY frontend/ ./
RUN pnpm build

# ----------------------------
# Stage 3: Final image
# ----------------------------
FROM node:22-slim

WORKDIR /app
EXPOSE 8080

# Copy backend build
COPY --from=backend-build /app/backend/dist ./
COPY --from=backend-build /app/backend/node_modules ./node_modules

# Copy static frontend
COPY --from=frontend-build /app/frontend/dist/onboarding/browser ./static

# Copy config
COPY ./backend/src/config/application.default.yaml /app/application.default.yaml
COPY ./backend/templates /app/templates

# Default command
CMD ["node", "index.js"]
