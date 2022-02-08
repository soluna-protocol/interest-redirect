# Soluna protocol contracts

## Components

* [Core](./contracts/core) - Official implementation of Soluna Protocol

## Development

### Environment Setup

* Rust v1.44.1+
* `wasm32-unknown-unknown` target
* Docker

1. Install `rustup` via <https://rustup.rs/>

2. Run the following:

```sh
rustup default stable
rustup target add wasm32-unknown-unknown
```

1. Make sure [Docker](https://www.docker.com/) is installed

### Unit / Integration Tests

Each contract contains Rust unit and integration tests embedded within the contract source directories. You can run:

```sh
cargo test
```

### Compiling

#### Production

For production builds, run the following:

```sh
docker run --rm -v "$(pwd)":/code \
  --mount type=volume,source="$(basename "$(pwd)")_cache",target=/code/target \
  --mount type=volume,source=registry_cache,target=/usr/local/cargo/registry \
  cosmwasm/workspace-optimizer:0.12.1
```

This performs several optimizations which can significantly reduce the final size of the contract binaries, which will
be available inside the `artifacts/` directory.

## License

MIT @Soluna Protocol

## Deployed

***Bombay***
code_id: 41242
core_pool: terra1t2eehshcueggptcge5prr4vx8wrztx3v8vwku7
solUST: terra1spgmfack053u53e6mj47xq3rxfe4cx8cgtlgpq

***Columbus***
code_id: 2763
core_pool: terra1aug2pyftq4e85kq5590ud30yswnewa42n9fmr8
solUST: terra1ysx2yfxn7uk6s8ujmnamrv7h6s3egxazt2j69c
