import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  ImageBackground,
  ScrollView,
} from 'react-native';
import Button from '../components/Button';
import Inputbox from '../components/Inputbox';
import logo from '../assets/run-matter-logo.png';
import background_img from '../assets/backgroung-image.png';
import colors from '../assets/colors';
import Heading from '../components/Heading';
import {connect} from 'react-redux';
import * as actions from '../store/Actions/index';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const LogIn = ({navigation, UserReducer, user_login}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const _onPressLogIn = () => {
    if (username === '' || password === '') {
      alert('Both fields required');
    } else if (username === 'admin' || password === 'admin') {
      user_login({
        userData: {
          displayName: username === 'admin' ? 'Michael Reiner' : username,
        },
        accessToken: 'TgvD65JmyrtprreASrrHBV64VB3v3B6apsh3gfNvf35jh7H',
      
      }).then(() => {
        console.log('work');
      });
    } else {
      // navigation.navigate('Home');
      alert('Invalid Credentials');
      // console.log(email);
    }
  };
  const _onPressSignUp = () => {
    navigation.navigate('SignUp');
  };
  const _onPresspassword = () => {
    navigation.navigate('ForgotPassword');
  };

  return (
    <View>
      <ImageBackground source={background_img} style={styles.image}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.centerView}>
            <Image source={logo} style={styles.logo} resizeMode="contain" />

            <View style={styles.inputBoxes}>
              <Inputbox
                viewStyle={{width: width * 0.8, height: height * 0.08}}
                value={username}
                setTextValue={setUsername}
                placeholderTilte="Username"
                placeHolderColor="grey"
                iconStyle={{color: 'grey', fontSize: width * 0.034}}
                iconType="FontAwesome5"
                iconName="user"
                isShowRightIcon={true}
                textInputStyle={{color: 'grey', width: width * 0.8}}
              />
              <Inputbox
                value={password}
                isSecure={true}
                placeHolderColor="grey"
                setTextValue={setPassword}
                placeholderTilte="Password"
                isSecure={true}
                viewStyle={{width: width * 0.8, height: height * 0.08}}
                iconStyle={{color: 'grey'}}
                textInputStyle={{color: 'grey', width: width * 0.8}}
              />
            </View>
            <Button
              title="Login"
              onBtnPress={() => _onPressLogIn()}
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
                title="Forgot Password?"
                passedStyle={styles.forgetPass}
                fontType="medium"
              />
              <TouchableOpacity onPress={() => _onPresspassword()}>
                <Heading
                  passedStyle={styles.clickHere}
                  title="Click Here"
                  fontType="semi-bold"
                />
              </TouchableOpacity>
            </View>

            <View style={styles.horizontalLinePosition}>
              <View style={styles.horizontalLine} />
              <View>
                <Heading
                  passedStyle={styles.orStyle}
                  fontType="medium"
                  title="Or"
                />
              </View>
              <View style={styles.horizontalLine} />
            </View>
            <View style={{position: 'relative'}}>
              <Button
                title="Sign Up Now"
                onBtnPress={() => _onPressSignUp()}
                isBgColor={false}
                btnStyle={styles.btnSignUpStyle}
                btnTextStyle={styles.btnSignUpTextStyle}
              />
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  centerView: {
    justifyContent: 'center',
    alignItems: 'center',
    height: height,
  },
  orStyle: {
    fontSize: width * 0.03,
    paddingHorizontal: width * 0.02,
    textAlign: 'center',
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
  forgetPass: {
    color: 'rgba(0,0,0,0.7)',
    fontSize: width * 0.035,
  },

  btnSignUpStyle: {
    backgroundColor: 'transparent',
    borderRadius: width * 0.8,
    width: width * 0.8,
    borderWidth: 1,
    borderColor: colors.themeBlue,
  },
  btnSignUpTextStyle: {
    color: colors.themeBlue,
    fontFamily: 'Montserrat-SemiBold',
  },

  clickHere: {
    color: colors.themeBlue,
    fontSize: width * 0.035,
    marginLeft: width * 0.01,
    textDecorationLine: 'underline',
  },
  horizontalLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'gray',
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
    margin: 15,
    marginTop: height * 0.1,
  },

  image: {
    justifyContent: 'center',
    width: width,
    height: height,
    alignSelf: 'center',
    alignItems: 'center',
  },
  scrollview: {
    height: height,
  },
  inputBoxes: {
    marginTop: height * 0.02,
  },
});

// export default LogIn;
const mapStateToProps = ({UserReducer}) => {
  return {UserReducer};
};

export default connect(mapStateToProps, actions)(LogIn);
