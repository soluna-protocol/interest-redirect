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

const wallet = terra.wallet(mk);

const execute = new MsgExecuteContract(
  wallet.key.accAddress, // sender
  "terra1vt8ln3dn3fu7uceyde6q67annt46cy8jvxwjlq", // contract account address
  { configure: {beneficiary: "terra1hf37ztxxne8tlv6dmzl6370ndyjg8f7sxm6mkr"} }, // handle msg
);

const executeTx = await wallet.createAndSignTx({
  msgs: [execute]
});

const executeTxResult = await terra.tx.broadcast(executeTx);