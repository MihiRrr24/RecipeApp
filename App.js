import React, { useEffect, useCallback, useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

import HomeScreen from './screens/HomeScreen';
import AddEditScreen from './screens/AddEditScreen';

SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator();

export default function App() {
  const [appReady, setAppReady] = useState(false);

  const loadResources = async () => {
    try {
      await Font.loadAsync({
        // preload any custom fonts if needed
      });

      // Simulate delay
      await new Promise(resolve => setTimeout(resolve, 1500));
    } catch (e) {
      console.warn(e);
    } finally {
      setAppReady(true);
    }
  };

  useEffect(() => {
    loadResources();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appReady) {
      await SplashScreen.hideAsync();
    }
  }, [appReady]);

  if (!appReady) {
    return (
      <Animated.View
        style={styles.splashContainer}
        entering={FadeIn}
        exiting={FadeOut}
      >
        <Image
          source={require('./assets/images/splash-icon.png')}
          style={styles.splashImage}
          resizeMode="contain"
        />
      </Animated.View>
    );
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: '#28a745',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        >
          <Stack.Screen name="Recipes" component={HomeScreen} />
          <Stack.Screen
            name="AddEdit"
            component={AddEditScreen}
            options={{ title: 'Add / Edit Recipe' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  splashImage: {
    width: 200,
    height: 200,
  },
});
