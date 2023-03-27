import React, {ReactNode, useEffect, useState} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {styles} from '../../App';
import * as bip39 from 'bip39';
import {
  Connection,
  clusterApiUrl,
  Keypair,
  PublicKey,
  LAMPORTS_PER_SOL,
  SystemProgram,
  Transaction,
  sendAndConfirmTransaction,
} from '@solana/web3.js';
import 'react-native-get-random-values';
const mnemonic =
  'doctor mask legal clay seed riot recipe today since supreme load accuse';
const createConnection = () => {
  return new Connection(clusterApiUrl('devnet'), 'confirmed');
};

async function getBalance(publicKey: any) {
  try {
    const connection = createConnection();
    // const wal=new PublicKey(publicKey);
    console.log('func getBalance started in solana');
    const balance = await connection.getBalance(publicKey).catch(err => {
      console.error(`Error: ${err}`);
    });
    // console.log('solana balance  is ', balance);
    const ans = Number(balance) / LAMPORTS_PER_SOL;
    console.log(`solana balance  is ${ans} SOL`);
    // setBal(ans);
    console.log('abt to reutrn ');
    return ans;
  } catch (err) {
    console.log('error is ', err);
  }
}

const requestAirdrop = async (publicKey: any) => {
  // setRequestAirdropButton({ text: BUTTON_TEXT_LOADING, loading: true });
  try {
    const connection = createConnection();
    const airdropSignature = await connection.requestAirdrop(
      publicKey,
      LAMPORTS_PER_SOL,
    );
    const signature = await connection.confirmTransaction(airdropSignature);

    const newBalance = await getBalance(publicKey);
    console.log('new balance of your solana acc is', newBalance);
  } catch (err) {
    console.log('error fro airdrop is ', err);
  }
  // setAccount({ ...account, balance: newBalance });
  // setRequestAirdropButton({ text: BUTTON_TEXT, loading: false });
};

function Solana() {
  async function sendSOL(reciver: any) {
    try {
      const kpair = generateKeys();
      const connection = createConnection();
      const transferTransaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: kpair.publicKey,
          toPubkey: reciver,
          lamports: 1,
        }),
      );
      // const signer = Keypair.fromSecretKey(Uint8Array.from(kpair.secretKey));
      const ps = await sendAndConfirmTransaction(
        connection,
        transferTransaction,
        [kpair],
      );

      console.log('done from SOL');
    } catch (error) {
      console.log('error from sol func', error);
    }
  }
  function generateKeys() {
    const seed = bip39.mnemonicToSeedSync(mnemonic, ''); // (mnemonic, password)
    const keypair = Keypair.fromSeed(seed.subarray(0, 32));
    console.log('public from key', keypair.publicKey);
    return keypair;
  }

  const pubSolKey = generateKeys().publicKey;
  const [pubKey, setPubKey] = useState<ReactNode>(pubSolKey.toString());
  const [bal, setBal] = useState(0);

  // the below function below triggers Airdrop func, where it sends tokens to our account.
  //when ever need, uncomment the below one
  // requestAirdrop(pubKey);

  useEffect(() => {
    (async () => {
      try {
        const connection = createConnection();
        console.log('useEffect started');
        const balance = await connection.getBalance(pubSolKey).catch(err => {
          console.error(`Error: ${err}`);
        });
        // console.log('getBalance from useEffect is ',balance);
        const ans = Number(balance) / LAMPORTS_PER_SOL;
        console.log(`Solana balance is ${ans} SOL`);
        setBal(ans);
        console.log('abt to return from solana balancing computation ');
      } catch (err) {
        console.log('error is ', err);
      }
    })();
  }, [pubSolKey]);
  const [showBal, setShowBal] = useState(false);
  return (
    // <View>
    //   <Text style={{fontSize: 20, fontWeight: '600'}}>
    //     This is Solana Wallet
    //   </Text>
    //   <Text style={{fontSize: 20, fontWeight: '600'}}>
    //     Public Key is {pubKey} SOL
    //   </Text>
    //   <Text style={{fontSize: 20, fontWeight: '600'}}>
    //     Balance is {bal} SOL
    //   </Text>
    // </View>
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
      <Text style={{lineHeight: 20, padding: 10, color: 'white'}}>
        <Text style={styles.appText}>Public Key:</Text> {pubKey}
      </Text>

      <View style={{alignItems: 'center'}}>
        <Text
          style={{lineHeight: 30, padding: 10, fontSize: 30, color: 'white'}}>
          <Text style={{fontSize: 30, color: 'red'}}>Balance:</Text>{' '}
          {showBal ? bal : 0} SOL
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
          onPress={() => setShowBal(!showBal)}
          style={styles.appButtonContainer1}>
          <Text style={styles.appButtonText}>Fetch Balance</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Solana;
