import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
  LogBox,
  FlatList,
} from 'react-native';
import Heading from '../components/Heading';
import userimg from '../assets/Images/user_image.png';
import colors from '../assets/colors';
import Header from '../components/Header';
import wave from '../assets/Images/Wave.png';
import _1K from '../assets/Images/1k.png';
import STARS from '../assets/Images/stars.png';
import IconComp from '../components/IconComp';
import {connect} from 'react-redux';
import * as actions from '../store/Actions/index';
import OngoingJobs from '../components/OngoingJobs';

LogBox.ignoreLogs(['new NativeEventEmitter']);

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const HomeOptionWithoutRightIcon = ({item, onPress}) => {
  return (
    <TouchableOpacity
      style={styles.containerOption}
      activeOpacity={0.9}
      onPress={() => {
        onPress(item);
      }}>
      <View style={styles.boxContainer}>
        <Image
          source={item.image}
          style={styles.imageStyle}
          resizeMode="contain"
        />
      </View>
      <View style={styles.texticonhandler}>
        <Heading
          passedStyle={styles.textOption}
          title={item.text}
          fontType="bold"
        />
      </View>
    </TouchableOpacity>
  );
};

function Home({navigation, UserReducer}) {
  const [toggle, setToggle] = useState(true);
  const [options, setOptions] = useState(dummyOptions);
  let name = UserReducer?.userData?.displayName?.split(' ')[0];
  console.log({name})
  let job = {
    _id: 1,
    name: 'Jason Brown',
    type: 'mechanic',
  };
  // Options Handler
  const _onPressOptions = item => {
    // navigation.navigate('Map');
  };

  const _onPressOngoingJobs = (item, index) => {
    navigation.navigate('Map');
  };
  return (
    <View style={styles.container}>
      {/* Header  */}
      <Header title="Menu" navigation={navigation} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}>
        {/* Username and Hi Wave  */}
        <View style={styles.nameAndWaveStyle}>
          <Image source={wave} style={styles.img_wave} resizeMode="contain" />
          {/* <View style={styles.helloView}>
            <Heading title="Hello," fontType="bold" />
            <Heading
              title={name}
              passedStyle={styles.heading_username}
              fontType="bold-italic"
            />
          </View> */}
           <View
              style={{
                flexDirection: name?.length > 7 ? 'column' : 'row',
                width: width * 0.8,
              }}>
              <Heading
                title="Hello,"
                passedStyle={styles.heading}
                fontType="bold"
              />
              <Heading
                title={name}
                passedStyle={styles.heading_username}
                fontType="bold-italic"
              />
            </View>
        </View>

        {/* Availability  */}
        <View style={styles.availabilityView}>
          <Heading
            title="Availability"
            fontType="bold"
            passedStyle={styles.availText}
          />
          <TouchableOpacity
            onPress={() => setToggle(!toggle)}
            activeOpacity={0.8}>
            <IconComp
              iconName={toggle ? 'toggle-switch' : 'toggle-switch-off'}
              type={'MaterialCommunityIcons'}
              passedStyle={
                toggle ? styles.toggleOnStyle : styles.toggleOffStyle
              }
            />
          </TouchableOpacity>
        </View>

        {/* Options  */}
        <View style={styles.flatListContentContainerStyle}>
          <HomeOptionWithoutRightIcon
            item={Options[0]}
            onPress={_onPressOptions}
          />
          <HomeOptionWithoutRightIcon
            item={Options[1]}
            onPress={_onPressOptions}
          />
        </View>

        {/* Ongoing Jobs  */}
        <View style={[styles.ongoingJobsView]}>
          <Heading
            title="Ongoing Job"
            fontType="bold"
            passedStyle={styles.ongoingLabel}
          />

          {job ? (
            <TouchableOpacity
              style={styles.popUpBoxContainer}
              activeOpacity={0.8}
              onPress={() =>
                // navigation.navigate('RideCompleted')
                navigation.navigate('Map')
              }>
              <View style={styles.rowView}>
                <Image source={userimg} />
                <View>
                  <Heading
                    passedStyle={styles.popUpText}
                    title={'Jason Brown'}
                    fontType="bold"
                  />
                  <Heading
                    passedStyle={styles.textMechanic}
                    title={'Mechanic'}
                    fontType="medium"
                  />
                </View>
              </View>

              <IconComp
                iconName="chevron-with-circle-right"
                type={'Entypo'}
                passedStyle={styles.icon_style}
              />
            </TouchableOpacity>
          ) : (
            <View style={styles.noJobsView}>
              <Image
                resizeMode="contain"
                source={require('../assets/Images/warn.png')}
                style={styles.noJobImage}
              />
              <Heading
                title="No job assigned yet."
                passedStyle={styles.noJobTitle}
              />
            </View>
          )}

          {/* <FlatList
          data={dummyJobs}
          nestedScrollEnabled={true}
          keyExtractor={item => item._id.toString()}
          renderItem={({item, index}) => (
            <OngoingJobs
              item={item}
              index={index}
              onPress={_onPressOngoingJobs}
            />
          )}
          ListHeaderComponent={() => (
            <Heading
              title="Ongoing Jobs"
              fontType="bold"
              passedStyle={styles.ongoingLabel}
            />
          )}
          ListHeaderComponentStyle={{
            justifyContent: 'center',
            alignItems: 'flex-start',
            alignSelf: 'center',
            width: width * 0.85,
            marginVertical: height * 0.01,
          }}
          contentContainerStyle={{
            marginTop: height * 0.03,
            alignItems: 'center',
          }}
        /> */}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  noJobsView: {
    marginTop: height * 0.02,
    // justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  noJobTitle: {
    fontSize: width * 0.05,
    marginLeft: width * 0.02,
  },
  noJobImage: {
    width: width * 0.1,
    height: height * 0.05,
  },
  ongoingJobsView: {
    borderTopColor: 'rgba(0,0,0,0.08)',
    borderTopWidth: 1,
    marginTop: height * 0.03,
    paddingVertical: height * 0.03,
    paddingHorizontal: width * 0.08,
  },
  icon_style: {
    marginLeft: width * 0.14,
  },

  textMechanic: {
    fontSize: height * 0.017,
    color: 'gray',
    marginLeft: width * 0.03,
  },
  popUpText: {
    fontSize: height * 0.025,
    color: 'black',
    marginLeft: width * 0.03,
  },
  rowView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ongoingLabel: {
    fontSize: width * 0.05,
  },
  toggleOnStyle: {
    fontSize: width * 0.15,
    color: colors.themeGreen,
  },
  toggleOffStyle: {
    fontSize: width * 0.15,
    color: 'grey',
  },
  availText: {
    fontSize: width * 0.05,
  },
  availabilityView: {
    borderTopWidth: 1,
    marginVertical: height * 0.03,
    paddingHorizontal: width * 0.09,
    borderBottomWidth: 1,
    paddingVertical: height * 0.01,
    borderTopColor: 'rgba(0,0,0,0.08)',
    borderBottomColor: 'rgba(0,0,0,0.08)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  helloView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nameAndWaveStyle: {
    marginHorizontal: width * 0.09,
    marginTop: height * 0.05,
  },
  btnStyle: {
    backgroundColor: colors.themeBlue,
    borderRadius: width * 0.08,
    width: width * 0.6,
  },
  btnTextStyle: {
    color: 'white',
    fontSize: width * 0.04,
  },
  flatListContentContainerStyle: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  allServicesStyle: {
    // marginVertical: height * 0.05,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  img_wave: {
    width: width * 0.14,
    height: height * 0.07,
  },
  heading: {
    color: 'black',
    fontSize: width * 0.11,
  },
  heading_username: {
    color: colors.themeBlue,
    fontSize: width * 0.11,
    paddingLeft: width * 0.02,
  },

  popUpBoxContainer: {
    flexDirection: 'row',
    paddingHorizontal: width * 0.04,
    justifyContent: 'space-between',
    borderRadius: width * 0.02,
    height: height * 0.13,
    width: width * 0.85,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      height: 9,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    backgroundColor: '#fff',
  },

  boxContainer: {
    borderRadius: width * 0.02,
    height: height * 0.2,
    width: width * 0.4,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: height * 0.02,
    marginLeft: width * 0.065,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    backgroundColor: 'white',
    paddingHorizontal: width * 0.2,
    paddingVertical: height * 0.005,
  },

  text: {
    fontSize: width * 0.05,
    color: '#000',
    marginLeft: width * 0.08,
    marginRight: width * 0.22,
    marginTop: height * 0.01,
  },

  containerOption: {
    marginHorizontal: width * 0.025,
  },
  textOption: {
    fontSize: width * 0.04,
    textTransform: 'capitalize',
    color: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageStyle: {
    width: width * 0.32,
    // height: height * 0.07,
  },
  texticonhandler: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: height * 0.02,
  },

  boxContainer: {
    borderRadius: width * 0.02,
    height: height * 0.2,
    width: width * 0.4,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: height * 0.02,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: 'white',
  },
});

const mapStateToProps = ({UserReducer}) => {
  return {UserReducer};
};
export default connect(mapStateToProps, actions)(Home);

const dummyOptions = [
  {
    _id: 1,
    text: 'towing',
    image: require('../assets/Images/services/towing.png'),
  },
  {
    _id: 2,
    text: 'battery',
    image: require('../assets/Images/services/battery.png'),
  },
  {
    _id: 3,
    text: 'accident',
    image: require('../assets/Images/services/accident.png'),
  },
  {
    _id: 4,
    text: 'flat tyre',
    image: require('../assets/Images/services/flattyre.png'),
  },
];

const Options = [
  {
    _id: 1,
    image: _1K,
    text: 'completed jobs',
  },
  {
    _id: 2,
    image: STARS,
    text: 'Ratings',
  },
];

const dummyJobs = [
  {
    _id: 1,
    name: 'Jason Brown',
    type: 'mechanic',
  },
];
