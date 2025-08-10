[private]
default:
  @just --list --unsorted

[group('local')]
dev *args:
  bun dev {{ args }}

[group('build')]
build *args:
  bun run build {{ args }}

[group('utils')]
deploy:
  GIT_COMMIT_HASH=$(git rev-parse HEAD) docker-compose -f compose.yaml up -d

[group('utils')]
clean:
  rm -rf node_modules/ .output/ .data/ .nuxt/
  bun install
