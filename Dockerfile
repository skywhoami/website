FROM oven/bun:1 AS base
WORKDIR /usr/src/app

FROM base AS install
RUN mkdir -p /temp/dev
COPY package.json bun.lock /temp/dev/
RUN cd /temp/dev && bun install --frozen-lockfile

FROM base AS install-prod
RUN mkdir -p /temp/prod
COPY package.json bun.lock /temp/prod/
RUN cd /temp/prod && bun install --frozen-lockfile --production

FROM base AS build
COPY --from=install /temp/dev/node_modules ./node_modules
COPY . .
ENV NODE_ENV=production
RUN bun run build

FROM base AS release
COPY --from=install-prod /temp/prod/node_modules ./node_modules
COPY --from=build /usr/src/app/.output ./.output
COPY --from=build /usr/src/app/package.json .
USER bun
EXPOSE 3000
ENTRYPOINT ["bun", "run", ".output/server/index.mjs"]
