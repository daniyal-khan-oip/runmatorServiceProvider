import {StripeProvider} from '@stripe/stripe-react-native';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import BankCardDetails from '../screens/BankCardDetails';

const StripeProvider = () => {
//   const [publishableKey, setPublishableKey] = useState('');

//   const fetchPublishableKey = async () => {
//     const key = await fetchKey(); // fetch key from your server here
//     setPublishableKey(key);
//   };

//   useEffect(() => {
//     fetchPublishableKey();
//   }, []);

  return (
    <StripeProvider
      publishableKey={
        'pk_test_51K3xrxJnOJgDuce6LgAdoAKVrpplHAvCGKWnnwHxCbObi1qZcYnvNMCIckaxxXnKnIk55cMYcapfPwqevMRJs5c300y77jOKbe'
      }
      merchantIdentifier="merchant.identifier">
      <BankCardDetails />
    </StripeProvider>
  );
};

export default StripeProvider;

const styles = StyleSheet.create({});
