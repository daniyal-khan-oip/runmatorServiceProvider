import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {StyleSheet, Text, View} from 'react-native';
import AuthRootStackScreens from './AuthRootStackScreens';
import MainAppScreens from './MainAppScreens';
const MainNavigator = ({UserReducer}) => {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (UserReducer.isUserLogin) {
      setToken('123');
    } else {
      setToken(null);
    }
  }, [UserReducer]);

  if (loading) {
    return <Text>Loading</Text>;
  } else {
    return (
      <NavigationContainer>
        {token != null || token != undefined ? (
          <MainAppScreens />
        ) : (
          <AuthRootStackScreens />
        )}
      </NavigationContainer>
    );
  }
};

// export default MainNavigator;
const mapStateToProps = ({UserReducer}) => {
  return {UserReducer};
};

export default connect(mapStateToProps, null)(MainNavigator);
