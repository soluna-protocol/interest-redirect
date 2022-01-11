# Pylon protocol contracts

## Components

* [Core](./contracts/core) - Official implementation of Pylon Protocol
* [Gateway](./contracts/gateway) - Contracts for pylon gateway
* [Pylon](./contracts/pylon) - Contracts for pylon token utilities

## Development

### Environment Setup

- Rust v1.44.1+
- `wasm32-unknown-unknown` target
- Docker

1. Install `rustup` via https://rustup.rs/

2. Run the following:

```sh
rustup default stable
rustup target add wasm32-unknown-unknown
```

3. Make sure [Docker](https://www.docker.com/) is installed

### Unit / Integration Tests

Each contract contains Rust unit and integration tests embedded within the contract source directories. You can run:

```sh
cargo unit-test
cargo integration-test
```

### Compiling

After making sure tests pass, you can compile each contract with the following:

```sh
RUSTFLAGS='-C link-arg=-s' cargo wasm
cp ../../target/wasm32-unknown-unknown/release/cw1_subkeys.wasm .
ls -l cw1_subkeys.wasm
sha256sum cw1_subkeys.wasm
```

#### Production

For production builds, run the following:

```sh
docker run --rm -v "$(pwd)":/code \
  --mount type=volume,source="$(basename "$(pwd)")_cache",target=/code/target \
  --mount type=volume,source=registry_cache,target=/usr/local/cargo/registry \
  cosmwasm/workspace-optimizer:0.10.4
```

This performs several optimizations which can significantly reduce the final size of the contract binaries, which will
be available inside the `artifacts/` directory.

## License

MIT @Pylon Protocol

### Kyle's commands 

```sh
docker run --rm -v "$(pwd)":/code \                                                                                                          
  --mount type=volume,source="$(basename "$(pwd)")_cache",target=/code/target \
  --mount type=volume,source=registry_cache,target=/usr/local/cargo/registry \
  cosmwasm/workspace-optimizer:0.12.1
```

```sh
export PATH=$PATH:$(go env GOPATH)/bin 
```

```sh
terrad tx wasm store artifacts/core_pool.wasm --from test1 --chain-id=localterra --gas=auto --fees=100000uluna --broadcast-mode=block 
```

```sh
terrad tx wasm instantiate 4 '{"beneficiary":"terra1dcegyrekltswvyy0xy69ydgxn9x8x32zdtapd8","dp_code_id": 148,"fee_collector":"terra1dcegyrekltswvyy0xy69ydgxn9x8x32zdtapd8","moneymarket":"terra1sepfj7s0aeg5967uxnfk4thzlerrsktkpelm5s","pool_name":"Pylon AnchorPool"}' --from test1 --chain-id=localterra --fees=10000uluna --gas=auto --broadcast-mode=block
```

### Deployed
***Bombay***
code_id: 32425
contract addresses: [
  'terra1vt8ln3dn3fu7uceyde6q67annt46cy8jvxwjlq',
  'terra1emqzm6me89rcd4pl93kvts3rpaeczj62nhwnzg'
]
  