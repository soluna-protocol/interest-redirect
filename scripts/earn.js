import { LCDClient, MsgExecuteContract, MsgSend, MsgSwap, MnemonicKey, isTxError, Coin, Coins} from '@terra-money/terra.js';
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
  "terra1t2eehshcueggptcge5prr4vx8wrztx3v8vwku7",
  { claimable_reward: { } } // query msg
);

console.log(result)

const wallet = terra.wallet(mk);

const execute = new MsgExecuteContract(
  wallet.key.accAddress,
  "terra1t2eehshcueggptcge5prr4vx8wrztx3v8vwku7",
  {
    earn: {},
  },
  {}
)

const executeTx = await wallet.createAndSignTx({
  msgs: [execute]
});

const _ = await terra.tx.broadcast(executeTx);