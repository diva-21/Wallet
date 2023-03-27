import React, {useState, useEffect} from 'react';
import {Alert, Button, Text, View, TouchableOpacity} from 'react-native';
import {ethers} from 'ethers';
import {JsonRpcProvider} from '@ethersproject/providers';
import '@ethersproject/shims';
import {styles} from '../../App';

function Wallet() {
  function differentPkeys(mnemonic: string) {
    return ethers.utils.HDNode.fromMnemonic(mnemonic);
  }
  const mnemonic =
    'sense letter between tuna domain fragile gate soul evolve master estate damp';
  console.log(differentPkeys(mnemonic));
  const HdnodeAddress = differentPkeys(mnemonic);

  const privatekey =
    '0xe5594b4814ce6485455096a3937ac4fb96d04598543ff895072a28d1ec81e894';
  const publicKey =
    '0x0476a63b569f29bb3dd7f1ba37bfd2d5c45b17faaf54f07cf9efeb69ec9d558831d1e6f79e2f7378c3f95ce21f17db1e0c1ef631d1dab2ecf8a43618c7c6007a83';
  const publicAddress = '0x4CfCa8920e7EF4465Eb2E0bB26e240D8A134F2a0';

  const recieverAddress = '0xa35d0F3a4d61A72BdDDb0701DcbE48e2cE9509D0';

  async function SR() {
    try {
      console.log('func activated');
      const provider = new ethers.providers.JsonRpcProvider(
        'https://rpc.ankr.com/eth_goerli',
        5,
      );
      const sender = new ethers.Wallet(privatekey, provider);

      const balanceBefore = await provider.getBalance(recieverAddress);
      console.log(
        `Destination balance before sending: ${ethers.utils.formatEther(
          balanceBefore,
        )} ETH`,
      );
      console.log('Sending...\n');

      const tx = await sender.sendTransaction({
        to: recieverAddress,
        value: ethers.utils.parseEther('0.0001'),
      });
      console.log(`TX hash: ${tx.hash}`);
      console.log('Waiting for receipt...');
      await provider.waitForTransaction(tx.hash, 1, 150000).then(() => {});
      const balanceAfter = await provider.getBalance(recieverAddress);
      console.log(
        `Destination balance after sending: ${ethers.utils.formatEther(
          balanceAfter,
        )} ETH`,
      );
      // fetchBalance()
    } catch (error) {
      console.log(error);
      console.log('Error in Send');
    }
  }

  async function fetchBalance() {
    try {
      const provider = new JsonRpcProvider(
        'https://rpc.ankr.com/eth_goerli',
        5,
      );
      const balancefromwallet = await provider.getBalance(publicAddress);
      setBalance(ethers.utils.formatEther(balancefromwallet).toString());
      // console.log("balance is ",balance)
      console.log('Etherium Balance fetched successfully');
    } catch (error) {
      console.log(error);
      console.log('Error fetching balance');
    }
  }
  console.log('wallet started');
  // useEffect(() => {
  //   fetchBalance();
  //   // SR();
  // }, [publicKey, privatekey, publicAddress]);
  const [balance, setBalance] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);
  return (
    <View
      style={{
        height: 'auto',
        width: '90%',
        display: 'flex',
        alignItems: 'center',
        borderColor: '#2cc995',
        borderWidth: 0.5,
        borderRadius: 8,
        padding: 10,
        margin: 20,
      }}>
      {!isPrivate && (
        <TouchableOpacity
          onPress={() => setIsPrivate(!isPrivate)}
          style={styles.appButtonContainerP}>
          <Text style={styles.appButtonTextP}>Private Key</Text>
        </TouchableOpacity>
      )}

      {isPrivate && (
        <Text style={{lineHeight: 20, padding: 10, color: 'white'}}>
          <Text style={styles.appText}>Private Key:</Text> {privatekey}
        </Text>
      )}

      <Text style={{lineHeight: 20, padding: 10, color: 'white'}}>
        <Text style={styles.appText}>Public Key:</Text> {publicKey}
      </Text>
      <Text style={{lineHeight: 20, padding: 10, color: 'white'}}>
        <Text style={styles.appText}>Address:</Text> {publicAddress}
      </Text>

      <View style={{alignItems: 'center'}}>
        <Text
          style={{lineHeight: 30, padding: 10, fontSize: 30, color: 'white'}}>
          <Text style={{fontSize: 30, color: 'red'}}>Balance:</Text> {balance}{' '}
          ETH
        </Text>
      </View>
      <View
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          width: '100%',
          height: 60,
        }}>
        <TouchableOpacity
          onPress={fetchBalance}
          style={styles.appButtonContainer1}>
          <Text style={styles.appButtonText}>Fetch Balance</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={SR} style={styles.appButtonContainer2}>
          <Text style={styles.appButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Wallet;
