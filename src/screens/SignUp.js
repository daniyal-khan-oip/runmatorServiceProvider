import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  ImageBackground,
  ScrollView,
  StatusBar,
} from 'react-native';
import Button from '../components/Button';
import Inputbox from '../components/Inputbox';
import background_img from '../assets/backgroung-image.png';
import logo from '../assets/run-matter-logo.png';
import Heading from '../components/Heading';
import colors from '../assets/colors';
import DocumentPicker from 'react-native-document-picker';
import {CardField, useStripe} from '@stripe/stripe-react-native';
import IconComp from '../components/IconComp';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const SignUp = ({navigation}) => {
  // Sign Up States
  const [step, setStep] = useState(1);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone_no, setPhone_no] = useState('');
  const [password, setPassword] = useState('');
  const [c_password, setC_Password] = useState('');

  // Card Details States
  const {confirmPayment} = useStripe();
  const [cardDetails, setCardDetails] = useState(null);
  // Document Details
  const [drivingLicense, setDrivingLicense] = useState([]);
  const [proofOfInsurance, setProofOfInsurance] = useState([]);
  const [dotNum, setDotNum] = useState(null);
  const [taxNum, setTaxNum] = useState(null);

  const _onPressNext = () => {
    if (step === 1) {
      if (
        email === '' ||
        password === '' ||
        c_password === '' ||
        username === '' ||
        phone_no === ''
      ) {
        alert('All fields required');
      } else if (password != c_password) {
        alert('Password does not match ');
      } else {
        setStep(step => step + 1);
      }
    } else if (step === 2) {
      if (cardDetails === null) {
        alert('Please enter card details.');
      } else {
        setStep(step => step + 1);
      }
    } else {
      if (
        drivingLicense == null ||
        proofOfInsurance == null ||
        dotNum == null ||
        taxNum === null
      ) {
        alert('Please enter complete document details.');
      } else {
        navigation.navigate('Otp',{
          username,
          email,
          phone_no,
          password,
          c_password,
        });
      }
    }
  };

  const _onPresslogin = () => {
    navigation.navigate('LogIn');
  };

  const _onPressUploadLicense = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images, DocumentPicker.types.pdf],
      });
      setDrivingLicense(res);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  };

  const _onPressUploadInsurance = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images, DocumentPicker.types.pdf],
      });
      setProofOfInsurance(res);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  };

  return (
    <>
      <View 
      // style={{justifyContent: 'center'}}
      >
         <StatusBar translucent={false}   backgroundColor={colors.themeBlue} barStyle='light-content' />
        <ImageBackground
          source={background_img}
          // resizeMode="cover"
          style={{width: width, height: height}}>
     
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.outerView}>
              <View style={styles.innerView}>
                {step == 1 ? (
                  <View
                    style={{
                      justifyContent: 'center',
                      height: height - 100,
                      alignItems: 'center',
                      marginVertical: height * 0.05,
                    }}>
                    <Image
                      resizeMode="contain"
                      source={logo}
                      style={styles.logo}
                    />

                    <View style={styles.inputBoxes}>
                      <Inputbox
                        value={username}
                        setTextValue={setUsername}
                        placeholderTilte="Username"
                        placeHolderColor="grey"
                      />
                      <Inputbox
                        value={email}
                        setTextValue={setEmail}
                        placeholderTilte="Email"
                        placeHolderColor="grey"
                      />
                      <Inputbox
                        value={phone_no}
                        setTextValue={setPhone_no}
                        placeholderTilte="Phone #"
                        keyboardType={'numeric'}
                        placeHolderColor="grey"
                      />
                      <Inputbox
                        value={password}
                        setTextValue={setPassword}
                        placeholderTilte="Password"
                        isSecure={true}
                        placeHolderColor="grey"
                      />
                      <Inputbox
                        value={c_password}
                        setTextValue={setC_Password}
                        placeholderTilte="Confirm Password"
                        isSecure={true}
                        placeHolderColor="grey"
                      />
                    </View>

                    <Button
                      title="Next >"
                      onBtnPress={() => _onPressNext()}
                      isBgColor={false}
                      btnStyle={styles.btnStyle}
                      btnTextStyle={styles.btnTextStyle}
                    />
                    <View
                      style={{
                        flexDirection: 'row',
                        marginBottom: 10,
                        justifyContent: 'center',
                      }}>
                      <Heading
                        title="Already have an account?"
                        fontType="medium"
                        passedStyle={styles.alreadyLabel}
                      />
                      <TouchableOpacity onPress={() => _onPresslogin()}>
                        <Heading
                          title="Login"
                          fontType="bold"
                          passedStyle={styles.loginLabel}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                ) : step == 2 ? (
                  <View
                    style={{justifyContent: 'center', height: height - 100}}>
                    <Heading
                      title="BANK CARD DETAILS"
                      fontType="extra-bold"
                      passedStyle={styles.heading}
                    />

                    <View style={styles.cardView}>
                      <CardField
                        postalCodeEnabled={true}
                        placeholder={{
                          number: '4242 4242 4242 4242',
                        }}
                        cardStyle={{
                          color: '#000000',
                          borderRadius: 30,
                          fontSize: 14,
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
                      title="Next"
                      onBtnPress={() => _onPressNext()}
                      isBgColor={false}
                      btnStyle={styles.btnStyle}
                      btnTextStyle={styles.btnTextStyle}
                    />
                    {/* </ImageBackground> */}
                  </View>
                ) : (
                  <View
                    style={{justifyContent: 'center', height: height - 100}}>
                    <Heading
                      title="DOCUMENT DETAILS"
                      passedStyle={styles.heading}
                      fontType="extra-bold"
                    />
                    <View style={styles.inputBoxes}>
                      <View style={styles.rowView}>
                        <Inputbox
                          isEditable={false}
                          value={drivingLicense[0]?.name}
                          setTextValue={setDrivingLicense}
                          placeholderTilte="Driving License"
                          placeHolderColor="grey"
                          viewStyle={{width: width * 0.52}}
                          textInputStyle={{width: width * 0.52}}
                        />

                        <TouchableOpacity
                          style={styles.rowUpperView}
                          activeOpacity={0.8}
                          onPress={() => _onPressUploadLicense()}>
                          <IconComp
                            type="Feather"
                            iconName="upload"
                            passedStyle={styles.iconUploadStyle}
                          />
                          <Heading
                            title="Upload"
                            fontType="semi-bold"
                            passedStyle={styles.uploadText}
                          />
                        </TouchableOpacity>
                      </View>

                      <View style={styles.rowView}>
                        <Inputbox
                          isEditable={false}
                          value={proofOfInsurance[0]?.name}
                          setTextValue={setProofOfInsurance}
                          placeholderTilte="Proof of insurance"
                          placeHolderColor="grey"
                          viewStyle={{width: width * 0.52}}
                          textInputStyle={{width: width * 0.52}}
                        />

                        <TouchableOpacity
                          style={styles.rowUpperView}
                          activeOpacity={0.8}
                          onPress={() => _onPressUploadInsurance()}>
                          <IconComp
                            type="Feather"
                            iconName="upload"
                            passedStyle={styles.iconUploadStyle}
                          />
                          <Heading
                            title="Upload"
                            fontType="semi-bold"
                            passedStyle={styles.uploadText}
                          />
                        </TouchableOpacity>
                      </View>

                      <Inputbox
                        value={dotNum}
                        setTextValue={setDotNum}
                        placeholderTilte="DOT number"
                        keyboardType={'numeric'}
                        placeHolderColor="grey"
                      />
                      <Inputbox
                        value={taxNum}
                        setTextValue={setTaxNum}
                        placeholderTilte="EIN number/Tax number"
                        placeHolderColor="grey"
                      />
                    </View>
                    <Button
                      title="Sign Up"
                      onBtnPress={() => _onPressNext()}
                      isBgColor={false}
                      btnStyle={styles.btnStyle}
                      btnTextStyle={styles.btnTextStyle}
                    />
                  </View>
                )}
              </View>

              <View style={styles.circlesView}>
                <View
                  style={[
                    styles.circleGrey,
                    step === 1 && {backgroundColor: colors.themeBlue},
                  ]}
                />
                <View
                  style={[
                    styles.circleGrey,
                    step === 2 && {backgroundColor: colors.themeBlue},
                  ]}
                />
                <View
                  style={[
                    styles.circleGrey,
                    step === 3 && {backgroundColor: colors.themeBlue},
                  ]}
                />
              </View>
            </View>
          </ScrollView>
        </ImageBackground>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  uploadText: {
    fontSize: width * 0.045,
    color: colors.themeBlue,
    marginLeft: width * 0.02,
  },
  iconUploadStyle: {
    color: colors.themeBlue,
    fontSize: width * 0.05,
  },
  rowUpperView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: width * 0.05,
  },
  rowView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  circlesView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    // paddingTop: 10,
    height: 100,
    // position:'absolute', bottom: 0, left: 0, right: 0
  },
  cardCustomStyle: {
    width: '90%',
    height: 50,
    marginVertical: 30,
  },
  cardStyle: {
    color: '#000000',
    borderRadius: 30,
    fontSize: 14,
  },
  cardView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerView: {
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
  },
  outerView: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    // height: '100%',
    // width: '100%',
  },
  heading: {
    color: colors.themeBlue,
    textAlign: 'center',
    fontSize: width * 0.09,
  },
  alreadyLabel: {
    fontSize: width * 0.034,
    color: 'rgba(0,0,0,.8)',
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
  loginLabel: {
    fontSize: width * 0.034,
    color: colors.themeBlue,
    paddingLeft: width * 0.015,
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

  logo: {
    // margin: 15,
    // width: width * 0.5,
    // height: height * 0.17,
    // backgroundColor: 'red',
  },

  image: {
    // flex: 1,
    // resizeMode: 'stretch',
    justifyContent: 'center',
    width: width,
    height: height,
    // backgroundColor:'red',
    alignSelf: 'center',
    alignItems: 'center',
  },
  scrollview: {
    height: height,
  },
  inputBoxes: {
    marginTop: height * 0.02,
  },
  circleGrey: {
    borderRadius: 50,
    backgroundColor: 'grey',
    width: width * 0.02,
    height: width * 0.02,
    marginHorizontal: width * 0.01,
  },
});

export default SignUp;
