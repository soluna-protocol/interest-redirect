import { LCDClient, MsgInstantiateContract, MsgStoreCode, MnemonicKey, isTxError, Coins} from '@terra-money/terra.js';
import fetch from 'isomorphic-fetch';
import "dotenv/config";

// Fetch gas prices and convert to `Coin` format.
const gasPrices = await (await fetch('https://bombay-fcd.terra.dev/v1/txs/gas_prices')).json();
const gasPricesCoins = new Coins(gasPrices);

const terra = new LCDClient({
  URL: "https://bombay-lcd.terra.dev/",
  chainID: "bombay-12",
  gasPrices: gasPricesCoins,
  gasAdjustment: "1.5",
  gas: 10000000,
});

const mk = new MnemonicKey({
  mnemonic: process.env.MNEMONIC
})

let result = await terra.wasm.contractQuery(
  "terra1vt8ln3dn3fu7uceyde6q67annt46cy8jvxwjlq",
  { config: { } } // query msg
);

console.log(result)

result = await terra.wasm.contractQuery(
  "terra1emqzm6me89rcd4pl93kvts3rpaeczj62nhwnzg",
  { 
    balance: {
      address: "terra1lm3c7tldz9m08duvce3t5f3n6r2r0e33f2ewgu"
    }
  }
)

console.log(result)

result = await terra.wasm.contractQuery(
  "terra1vt8ln3dn3fu7uceyde6q67annt46cy8jvxwjlq",
  { 
    deposit_amount_of: {
      owner: "terra1lm3c7tldz9m08duvce3t5f3n6r2r0e33f2ewgu"
    }
  }
)

console.log(result)