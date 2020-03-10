# console

![GitHub Actions status for "test-all-services"](https://github.com/mazgi/console/workflows/test-all-services/badge.svg)

## How to run

### Update submodules

```shellsession
git submodule update --init --recursive
```

### Download cargo-make

Linux:

```shellsession
export CARGO_MAKE_VERSION="0.26.1" \
&& curl -sL https://github.com/sagiegurari/cargo-make/releases/download/${CARGO_MAKE_VERSION}/cargo-make-v${CARGO_MAKE_VERSION}-x86_64-unknown-linux-musl.zip \
| busybox unzip -p - cargo-make-v${CARGO_MAKE_VERSION}-x86_64-unknown-linux-musl/cargo-make > bin/cargo-make && chmod a+x bin/cargo-make
```

macOS:

```shellsession
export CARGO_MAKE_VERSION="0.26.1" \
&& curl -sL https://github.com/sagiegurari/cargo-make/releases/download/${CARGO_MAKE_VERSION}/cargo-make-v${CARGO_MAKE_VERSION}-x86_64-apple-darwin.zip \
| bsdtar --strip-components 1 -C bin/ -xvf - cargo-make-v${CARGO_MAKE_VERSION}-x86_64-apple-darwin/cargo-make
```

### Set up the project via cargo-make

```shellsession
bin/cargo-make make --env-file=tasks.env --makefile=tasks/setup-project.toml
```

### Run via Docker Compose

```shellsession
docker-compose up
```

## How to build

```shellsession
bin/cargo-make make --makefile tasks.project-specific/build-production-images.toml
```

## How to Migrate DB

```shellsession
docker-compose run bff npm run typeorm -- migration:create --name Initialize
```

```shellsession
docker-compose run bff npm run typeorm -- migration:generate --name CreateTheWorld
```

```shellsession
docker-compose run bff npm run typeorm -- migration:run
```
