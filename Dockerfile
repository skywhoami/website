FROM oven/bun:1 AS build
WORKDIR /app

COPY package.json bun.lock ./

RUN bun install --frozen-lockfile --ignore-scripts

COPY . .

RUN bun --bun run build --dotenv

FROM oven/bun:1 AS production
WORKDIR /app

COPY --from=build /app/.output /app

EXPOSE 3000/tcp
ENTRYPOINT [ "bun", "--bun", "run", "/app/server/index.mjs" ]
