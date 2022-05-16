import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import Header from '../components/Header';
import * as actions from '../store/Actions/index';
import Heading from '../components/Heading';
import IconComp from '../components/IconComp';
import colors from '../assets/colors';
import Button from '../components/Button';
import Inputbox from '../components/Inputbox';
// import ImagePicker from 'react-native-image-crop-picker';
// test
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import DisplayNameChangeModal from '../components/DisplayNameChangeModal';
import {connect} from 'react-redux';

const {width, height} = Dimensions.get('window');

const Profile = ({navigation, UserReducer, updateUserData}) => {
  // image state
  const [userImage, setUserImage] = useState(null);
  const [image, setImage] = useState(UserReducer?.userData?.photo);
  // display name state
  const [displayName, setDisplayName] = useState(
    UserReducer?.userData?.displayName,
  );
  // modal state
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newpass, setNewpass] = useState('');
  const [loading, setLoading] = useState(false);
  const [cnfrmpass, setCnfrmpass] = useState('');
  // var matches = displayName?.match(/\b(\w)/g);
  // var acronym = matches?.join('');

  // Change Display Name
  const _onPressEditName = () => {
    setIsModalVisible(true);
  };

  // Upload Photo
  const uploadPhoto = async () => {
    var options = {
      title: 'Select Image',
      allowsEditing: true,
      quality: 0.9,
      maxWidth: 1200,
      maxHeight: 1200,
      mediaType: 'photo',
      includeBase64: true,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    launchImageLibrary(options, response => {
      // var ArraySingleImage = []
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        // SelectMultipleImage()
      } else {
        setUserImage(response);
      }
    });
  };

  const _onPressSave = async () => {
    setLoading(true);
    let userData = {
      photo: userImage
        ? `data:${userImage.assets[0].type};base64,${userImage.assets[0].base64}`
        : image,
      displayName: displayName,
    };
    await updateUserData(userData);
    // setTimeout(() => {
    //   alert('Changes Saved!');
    //   setLoading(false);
    // }, [5000]);
    alert('Changes Saved!');
    setLoading(false);
    // console.log(userData);
  };

  return (
    <View style={styles.container}>
      {/* Header  */}
      <Header
        showBack={true}
        navigation={navigation}
        iconName="arrow-back"
        iconSize={25}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Page Heading */}
        <Heading
          title="Profile Settings"
          passedStyle={styles.heading}
          fontType="bold"
        />

        {/* Image Container  */}
        <View style={styles.boxContainer}>
          {image || userImage ? (
            <Image
              source={{
                uri: userImage
                  ? `data:${userImage.assets[0].type};base64,${userImage.assets[0].base64}`
                  : image,
              }}
              style={[StyleSheet.absoluteFill, {borderRadius: 100}]}
            />
          ) : (
            <Heading
              passedStyle={styles.usernameWordsStyle}
              title={displayName?.match(/\b(\w)/g)?.join('')}
              fontType="bold"
            />
          )}
          <TouchableOpacity
            style={styles.iconTouchable}
            onPress={() => uploadPhoto()}>
            <IconComp
              iconName="camera-alt"
              type={'MaterialIcons'}
              passedStyle={styles.icon}
            />
          </TouchableOpacity>
        </View>

        {/* Username Container  & Password */}
        <View style={styles.usernameViewStyle}>
          <Heading
            // var matches = displayName?.match(/\b(\w)/g);
            // var acronym = matches?.join('');

            title={displayName}
            passedStyle={styles.usernameStyle}
            fontType="medium"
          />
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => _onPressEditName()}>
            <IconComp
              iconName="pencil"
              type="MaterialCommunityIcons"
              passedStyle={styles.pencilIcon}
            />
          </TouchableOpacity>
        </View>
        <Inputbox
          isSecure={true}
          viewStyle={styles.border_line}
          placeholderTilte="Change Password"
          textInputStyle={{color: 'black'}}
          placeHolderColor="rgba(0,0,0,0.7)"
          value={cnfrmpass}
          setTextValue={setCnfrmpass}
        />
        <Inputbox
          isSecure={true}
          viewStyle={styles.border_line}
          placeholderTilte="Confirm Password"
          placeHolderColor="rgba(0,0,0,0.7)"
          value={newpass}
          textInputStyle={{color: 'black'}}
          setTextValue={setNewpass}
        />
        {/* Save Button  */}
        <View style={styles.btnContainer}>
          <Button
            title={loading ? 'SAVING' : 'SAVE'}
            btnStyle={styles.btnStyle}
            onBtnPress={() => _onPressSave()}
            btnTextStyle={styles.btnTextColor}
            isBgColor={false}
          />
        </View>
      </ScrollView>
      {isModalVisible && (
        <DisplayNameChangeModal
          value={displayName}
          setValue={setDisplayName}
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  pencilIcon: {
    color: 'black',
    fontSize: width * 0.045,
    paddingLeft: width * 0.02,
  },
  usernameWordsStyle: {
    fontSize: width * 0.12,
    color: colors.themeBlue,
  },
  btnStyle: {
    borderRadius: width * 0.02,
    backgroundColor: colors.themeBlue,
  },
  btnTextColor: {
    color: 'white',
    fontSize: width * 0.045,
  },
  btnContainer: {
    alignItems: 'center',
    marginTop: height * 0.05,
    // paddingBottom: 100,
  },
  horizontalLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#707070',
    alignItems: 'center',
    justifyContent: 'center',
  },
  horizontalLinePosition: {
    flexDirection: 'row',
    marginLeft: width * 0.1,
    marginRight: width * 0.1,
  },
  heading: {
    color: 'black',
    marginLeft: width * 0.08,
    fontSize: width * 0.08,
    marginTop: height * 0.04,
  },
  boxContainer: {
    borderRadius: width * 0.8,
    height: width * 0.5,
    width: width * 0.48,
    alignItems: 'center',
    marginHorizontal: width * 0.22,
    marginTop: width * 0.06,
    justifyContent: 'center',
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: 'rgba(0,0,0,0.008)',
    // paddingHorizontal: width * 0.2,
    // paddingVertical: height * 0.005,
  },
  usernameStyle: {
    fontSize: height * 0.031,
    marginRight: width * 0.01,
  },
  icon: {
    backgroundColor: colors.themeBlue,
    color: '#ffffff',
    padding: height * 0.01,
    borderRadius: width,
  },
  iconTouchable: {
    position: 'absolute',
    top: height * 0.2,
    right: width * 0.01,
    backgroundColor: 'blue',
    borderRadius: width,
  },
  border_line: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.12)',
    width: width * 0.9,
    fontFamily: 'Montserrat-Regular',
    alignSelf: 'center',
  },
  imageStyle: {
    width: width * 0.5,
    height: height * 0.28,
    borderRadius: width * 0.8,
  },
  usernameViewStyle: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: height * 0.03,
  },
});

const mapStateToProps = state => {
  return {UserReducer: state.UserReducer};
};
export default connect(mapStateToProps, actions)(Profile);
