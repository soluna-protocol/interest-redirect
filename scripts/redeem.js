import { LCDClient, MsgExecuteContract, MsgSend, MsgSwap, MnemonicKey, isTxError, Coin, Coins} from '@terra-money/terra.js';
import * as fs from 'fs';
import fetch from 'isomorphic-fetch';
import { btoa } from 'buffer';

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
  mnemonic: 'popular raven ginger mechanic blind celery uncle will upon tilt midnight cannon wheat issue picture grass either family scheme world salad rice obtain auction'
})

// const mk = new MnemonicKey({
//   mnemonic: 'satisfy adjust timber high purchase tuition stool faith fine install that you unaware feed domain license impose boss human eager hat rent enjoy dawn'
// })

// // connect to localterra
// const terra = new LCDClient({
//   URL: 'http://localhost:1317',
//   chainID: 'localterra'
// });

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