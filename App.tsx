import React, {useEffect, useState} from 'react';
import {
  Alert,
  Button,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
// import './shim'
import {Buffer} from '@craftzdog/react-native-buffer';

//@ts-ignore
global.Buffer = Buffer;
import Solana from './src/components/solana';
import Wallet from './src/components/myWallet';
export const mnemonic =
  'doctor mask legal clay seed riot recipe today since supreme load accuse';

function App() {
  const [isWallet, setIsWallet] = useState(false);
  const [isSolana, setIsSolana] = useState(false);
  return (
    <>
      <View
        style={{
          width: '100%',
          display: 'flex',
          // height:'30%',
          justifyContent: 'center',
          backgroundColor: 'black',
          padding: 60,
        }}>
        <Text
          style={{
            fontSize: 40,
            color: '#2cc995',
            marginLeft: 40,
            width: '100%',
            fontWeight: '600',
          }}>
          Catalog
        </Text>
      </View>
      <View style={{backgroundColor: 'black', height: '80%'}}>
        <View style={{backgroundColor: 'black'}}>
          {!isWallet && (
            <View
              style={{
                height: 'auto',
                width: 'auto',
                display: 'flex',
                // justifyContent: 'flex-start',
                alignItems: 'center',
                backgroundColor: 'black',
                // marginTop: 20,
                marginBottom: 10,
              }}>
              <TouchableOpacity
                onPress={() => setIsWallet(!isWallet)}
                style={styles.appButtonContainer}>
                <Text style={styles.appButtonText}>Etherium Wallet</Text>
              </TouchableOpacity>
            </View>
          )}
          {isWallet && <Wallet />}

          {!isSolana && (
            <View
              style={{
                height: 'auto',
                width: 'auto',
                display: 'flex',
                // justifyContent: 'flex-start',
                alignItems: 'center',
                backgroundColor: 'black',
                // marginTop: 20,
              }}>
              <TouchableOpacity
                onPress={() => setIsSolana(!isSolana)}
                style={styles.appButtonContainer}>
                <Text style={styles.appButtonText}>Solana</Text>
              </TouchableOpacity>
            </View>
          )}
          {isSolana && <Solana />}
        </View>
      </View>
    </>
  );
}

export const styles = StyleSheet.create({
  appButtonContainerP: {
    elevation: 8,
    backgroundColor: '#2cc995',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  appButtonTextP: {
    fontSize: 10,
    color: '#fff',
    alignSelf: 'center',
    // textTransform: "uppercase"
  },
  appButtonContainer: {
    elevation: 8,
    backgroundColor: '#dd3f7d',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginHorizontal: 10,
    // width:"48%",
  },
  appButtonContainer1: {
    elevation: 8,
    backgroundColor: 'black',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginHorizontal: 10,
    width: '48%',
  },
  appButtonContainer2: {
    elevation: 8,
    backgroundColor: 'black',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginHorizontal: 30,
    width: '35%',
  },
  appButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    alignSelf: 'center',
    textTransform: 'uppercase',
  },
  appText: {
    fontSize: 18,
    color: '#dd3f7d',
    // fontWeight: "bold",
    alignSelf: 'center',
    // textTransform: "uppercase"
  },
});

export default App;
