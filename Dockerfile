FROM oven/bun:1 AS build
WORKDIR /app

COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

COPY . .

RUN bun run build

FROM oven/bun:1 AS production
WORKDIR /app

COPY --from=build /app/.output /app

EXPOSE 3000
ENTRYPOINT ["bun", "run", "/app/server/index.mjs"]
