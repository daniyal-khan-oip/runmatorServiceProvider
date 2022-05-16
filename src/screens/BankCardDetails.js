import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  ImageBackground,
  ScrollView,
} from 'react-native';
import Button from '../components/Button';
import Inputbox from '../components/Inputbox';
import background_img from '../assets/backgroung-image.png';
import Heading from '../components/Heading';
import colors from '../assets/colors';
import {CardField, useStripe} from '@stripe/stripe-react-native';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const BankCardDetails = ({navigation, route}) => {
  const {confirmPayment} = useStripe();
  const [cardDetais, setCardDetails] = useState(null);

  const _onPressNext = () => {
    if (cardDetails === null) {
      alert('Please enter card details.');
    } else {
      navigation.navigate('DocumentDetails');
    }
  };

  return (
    // <ScrollView showsVerticalScrollIndicator={false}>
    <ImageBackground
      style={{flex: 1}}
      resizeMode="cover"
      source={background_img}>
      <View style={{justifyContent: 'center',
       alignItems: 'center',
        flex: 1}}>
        {/* <ImageBackground source={background_img} style={styles.image}> */}
        {/* <Text style={styles.text}>BANK ACCOUNT DETAILS</Text> */}

        <Heading
          title="BANK CARD DETAILS"
          fontType="extra-bold"
          passedStyle={styles.heading}
        />

        <View
          style={{
            width: '100%',
            height: 100,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <CardField
            postalCodeEnabled={true}
            placeholder={{
              number: '4242 4242 4242 4242',
            }}
            cardStyle={{
              textColor: '#000000',
              borderRadius: 30,
            }}
            style={{
              width: '90%',
              height: 50,
              marginVertical: 30,
            }}
            onCardChange={cardDetails => {
              setCardDetails(cardDetails);
              console.log('cardDetails', cardDetails);
            }}
            onFocus={focusedField => {
              console.log('focusField', focusedField);
            }}
          />
        </View>
        <Button
          title="Next >"
          onBtnPress={() => _onPressNext()}
          isBgColor={false}
          btnStyle={styles.btnStyle}
          btnTextStyle={styles.btnTextStyle}
        />
        {/* </ImageBackground> */}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  heading: {
    color: colors.themeBlue,
    textAlign: 'center',
    fontSize: width * 0.09,
  },
  btnStyle: {
    backgroundColor: colors.themeBlue,
    borderRadius: width * 0.8,
    width: width * 0.8,
  },
  btnTextStyle: {
    color: 'white',
    fontFamily: 'Montserrat-SemiBold',
  },

  horizontalLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  horizontalLinePosition: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    width: width * 0.5,
  },
  image: {
    justifyContent: 'center',
    width: width,
    height: height,
    alignSelf: 'center',
    alignItems: 'center',
    zIndex: 0,
  },
  scrollview: {
    height: height,
  },
  inputBoxes: {
    marginTop: height * 0.02,
  },
});

export default BankCardDetails;
