import { LCDClient, MsgInstantiateContract, MsgStoreCode, MnemonicKey, isTxError, Coins} from '@terra-money/terra.js';
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

const code_id = 2763

const instantiate = new MsgInstantiateContract(
  wallet.key.accAddress,
  wallet.key.accAddress,
  code_id, // code ID
  {
    pool_name: "Soluna",
    beneficiary: "terra1cqenfchrkf0axul952sdr8ky5k5j8ye9acxje2",
    fee_collector: "terra1dwyfj2m3e3lcyzu6haznqnj57pl769n6947vgv",
    moneymarket: "terra1sepfj7s0aeg5967uxnfk4thzlerrsktkpelm5s",
    dp_code_id: 3,
  }, // InitMsg
);

const instantiateTx = await wallet.createAndSignTx({
  msgs: [instantiate],
});
const instantiateTxResult = await terra.tx.broadcast(instantiateTx);

console.log(instantiateTxResult);

if (isTxError(instantiateTxResult)) {
  throw new Error(
    `instantiate failed. code: ${instantiateTxResult.code}, codespace: ${instantiateTxResult.codespace}, raw_log: ${instantiateTxResult.raw_log}`
  );
}

const {
  instantiate_contract: { contract_address },
} = instantiateTxResult.logs[0].eventsByType;

console.log(contract_address)