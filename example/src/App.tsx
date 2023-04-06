import * as React from 'react';

import { Button, StyleSheet, View } from 'react-native';
import { GlobalComponentsView } from 'react-native-global-components';

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();

export default function App() {
  const [visible, setVisible] = React.useState(false);

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
                      setVisible(true);
                    }}
                  />
                </View>
              );
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
      {visible && (
        <GlobalComponentsView style={styles.gView}>
          <View style={styles.box} />
        </GlobalComponentsView>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gView: {
    // width: '100%',
    // height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: 0,
    top: 0,
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
    backgroundColor: 'pink',
  },
});
