import * as React from 'react';

import { Button, StyleSheet, View } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import {
  SimpleSnackbar,
  createSnackbar,
  createPopup,
  AlertPopup,
} from 'react-native-global-components';

const Stack = createStackNavigator();

const Snackbar = createSnackbar(SimpleSnackbar);

const Alert = createPopup(AlertPopup);

export default function App() {
  const nav = React.useRef<any>(null);

  return (
    <>
      <NavigationContainer
        ref={(ref) => {
          nav.current = ref;
        }}
      >
        <Stack.Navigator>
          <Stack.Screen
            name={'Main'}
            component={React.memo(() => {
              console.log('render');
              return (
                <View style={[styles.container, { backgroundColor: 'black' }]}>
                  <Button
                    title={'navigate'}
                    onPress={() => {
                      console.log('pressed!!');
                      nav.current.navigate('Modal');
                    }}
                  />
                </View>
              );
            })}
          />
          <Stack.Screen
            name={'Modal'}
            options={{
              presentation: 'modal',
            }}
            component={React.memo(() => {
              return (
                <View style={[styles.container, { backgroundColor: 'blue' }]}>
                  <Button
                    title={'navigate'}
                    onPress={() => {
                      console.log('pressed!!');
                      // Snackbar.show({ title: 'Hello from NativeView' });
                      Alert.show({
                        title: 'pressed!',
                        message: 'successful!!',
                      });
                    }}
                  />
                </View>
              );
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
      <Snackbar.Portal />
      <Alert.Portal />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
