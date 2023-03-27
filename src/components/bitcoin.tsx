// import React, {useEffect, useState} from 'react';
// import {Alert, Button, Text, View} from 'react-native';
// // import  CryptoAccount  from 'send-crypto';
// // import { ethers} from 'ethers';
// const mnemonic =
//   'doctor mask legal clay seed riot recipe today since supreme load accuse';
//   const privateKey="0xe5594b4814ce6485455096a3937ac4fb96d04598543ff895072a28d1ec81e894"
//   const CryptoAccount = require("send-crypto");

//   // async function create(){
//   //    try {
//   //     const hdWallet = ethers.utils.HDNode.fromMnemonic(mnemonic);
//   //     const acc=new CryptoAccount(hdWallet.privateKey,{network:'testnet'});
//   //     const addr=await acc.address('BTC').catch(err=>console.log('error from address'));
//   //     // return BitcoinProvider(hdWallet.privateKey, addr, acc, 'testnet');
//   //     console.log("address is ",addr);
//   //     return acc;
//   //    } catch (error) {
//   //     console.log(error)
//   //    }
//   // }
//   // create();
//   function BTC() {
//     // const private="0xe5594b4814ce6485455096a3937ac4fb96d04598543ff895072a28d1ec81e894"
//     // const acc=create();
//   return (
//     <View>
//       <Text>Hi frm BTC</Text>
//     </View>
//   );
// }

// export default BTC;
import * as bitcoin from 'bitcoinjs-lib';
import CryptoAccount from 'send-crypto';
import axios from 'axios';
import {BTCCompatProvider} from './provider';
import '../../shim'

const ecc = require('tiny-secp256k1');

export default class BitcoinProviderAS implements BTCCompatProvider {
  private account: CryptoAccount;
  private asset: string = 'BTC';
  private API = `https://blockstream.info/testnet/api`;
  private pk: string;
  constructor(privateKey: string) {
    this.pk = privateKey;
    this.account = new CryptoAccount(privateKey, {
      network: 'testnet',
    });
  }
  fundingTransactions(address: string, confirmations: number): Promise<string> {
    throw new Error('Method not implemented.');
  }
  getSecret(address: string): Promise<string> {
    throw new Error('Method not implemented.');
  }
  getPublicKey(): string {
    throw new Error('Method not implemented.');
  }
  getTransaction(txId: string): Promise<bitcoin.Transaction> {
    throw new Error('Method not implemented.');
  }
  broadcast(tx: bitcoin.Transaction): Promise<string> {
    throw new Error('Method not implemented.');
  }
  // getUnspent(address: string): Promise<bitcoin.Transaction[]> {
  //   throw new Error('Method not implemented.');
  // }

  getBalance(address: string): Promise<string> {
    throw new Error('Method not implemented.');
  }
  //TODO: handle fees later
  async receiveBTC(address: string, amount: string): Promise<string | void> {
    return this.account.sendSats(address, amount, this.asset);
  }

  // getPublicKey(): string {
  //   const ecpair = ECPairFactory(ecc).fromPrivateKey(
  //     Buffer.from(this.pk.substring(2), 'hex'),
  //   );
  //   return ecpair.publicKey.toString('hex');
  // }

  // async fundingTransactions(
  //   address: string,
  //   confirmations: number,
  // ): Promise<string> {
  //   const fundingTxsRes = await axios.get(`${this.API}/address/${address}/txs`);
  //   const txs = await this.parseTxs(
  //     fundingTxsRes.data,
  //     confirmations,
  //     address,
  //     true,
  //   );
  //   if (txs.length === 0) throw new Error('No funding transactions found');
  //   return txs[0].txid;
  // }

  // async getSecret(address: string): Promise<string> {
  //   try {
  //     const fundingTxsRes = await axios.get(
  //       `${this.API}/address/${address}/txs`,
  //     );
  //     const txs = await this.parseTxs(fundingTxsRes.data, 0, address, false);
  //     if (txs.length === 0) throw new Error('No spending transactions found');

  //     const tx = fundingTxsRes.data.find((tx: any) => tx.txid === txs[0].txid);
  //     return tx.vin[0].scriptsig_asm.split(' ')[5];
  //   } catch (error: any) {
  //     throw new Error(error.message);
  //   }
  // }

  // sign(hash: Buffer): Buffer {
  //   const signer = ECPairFactory(ecc).fromPrivateKey(
  //     Buffer.from(this.pk, 'hex'),
  //   );
  //   return signer.sign(hash);
  // }

  // async broadcast(tx: bitcoin.Transaction): Promise<string> {
  //   const txHex = tx.toHex();
  //   try {
  //     const res = await axios.post(`${this.API}/tx`, txHex);

  //     return res.data;
  //   } catch (error: any) {
  //     console.log(error.response.data);
  //     throw new Error(error.message);
  //   }
  // }

  // async getTransaction(txId: string): Promise<bitcoin.Transaction> {
  //   try {
  //     const res = await axios.get(`${this.API}/tx/${txId}/hex`);
  //     if (!res.data) throw new Error('Transaction not found');
  //     return bitcoin.Transaction.fromHex(res.data);
  //   } catch (error: any) {
  //     console.log(error.response.data);
  //     throw new Error(error.message);
  //   }
  // }

  // private async parseTxs(
  //   txs: any[],
  //   confirmations: number,
  //   address: string,
  //   funding: boolean,
  // ) {
  //   if (!txs.length) return [];
  //   const parsedTxs = txs.map((tx: any) => {
  //     //   if (tx.status.confirmed === false) return;
  //     //   if (!tx.status.block_height) return;
  //     if (funding && tx.vin[0].prevout.scriptpubkey_address !== address) {
  //       return tx;
  //     } else if (
  //       !funding &&
  //       tx.vin[0].prevout.scriptpubkey_address === address
  //     ) {
  //       return tx;
  //     }
  //   });
  //   const filteredTxs = parsedTxs.filter((tx: any) => tx !== undefined);
  //   return filteredTxs;
  // }
}

export {BitcoinProviderAS};