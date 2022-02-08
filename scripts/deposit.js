import { LCDClient, MsgExecuteContract, MsgSend, MsgSwap, MnemonicKey, isTxError, Coin, Coins} from '@terra-money/terra.js';
import * as fs from 'fs';
import fetch from 'isomorphic-fetch';
import "dotenv/config";

// Fetch gas prices and convert to `Coin` format.
const gasPrices = await (await fetch('https://fcd.terra.dev/v1/txs/gas_prices')).json();
const gasPricesCoins = new Coins(gasPrices);

const terra = new LCDClient({
  URL: "https://lcd.terra.dev/",
  chainID: "columbus-5",
  gasPrices: gasPricesCoins,
  gasAdjustment: "1.5",
  gas: 10000000,
});

const mk = new MnemonicKey({
  mnemonic: process.env.MNEMONIC
})

const wallet = terra.wallet(mk);

const execute = new MsgExecuteContract(
  wallet.key.accAddress, // sender
  "terra1aug2pyftq4e85kq5590ud30yswnewa42n9fmr8", // contract account address
  { deposit: {} }, // handle msg
  { uusd: "2000000" }
);

const executeTx = await wallet.createAndSignTx({
  msgs: [execute]
});
const r = await terra.tx.broadcast(executeTx);
const result = await terra.wasm.contractQuery(
  "terra1aug2pyftq4e85kq5590ud30yswnewa42n9fmr8",
  { total_deposit_amount: { } } // query msg
);

console.log(result)