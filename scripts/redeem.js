import { LCDClient, MsgExecuteContract, MsgSend, MsgSwap, MnemonicKey, isTxError, Coin, Coins} from '@terra-money/terra.js';
import * as fs from 'fs';
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
  { total_deposit_amount: { } } // query msg
);

console.log(result)

const wallet = terra.wallet(mk);

let message = Buffer.from(JSON.stringify({redeem: {}})).toString('base64');

const execute = new MsgExecuteContract(
  wallet.key.accAddress,
  "terra1emqzm6me89rcd4pl93kvts3rpaeczj62nhwnzg",
  {
    send: {
      amount: "8000000",
      contract: "terra1vt8ln3dn3fu7uceyde6q67annt46cy8jvxwjlq",
      msg: message,
    },
  },
  {}
)

const executeTx = await wallet.createAndSignTx({
  msgs: [execute]
});

const _ = await terra.tx.broadcast(executeTx);