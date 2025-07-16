
import React, { useEffect } from 'react';
import { View, Image, StyleSheet, Animated } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

export default function AnimatedSplashScreen({ onFinish }) {
  const fadeAnim = new Animated.Value(1);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 1500,
      delay: 1500,
      useNativeDriver: true,
    }).start(async () => {
      await SplashScreen.hideAsync();
      onFinish();
    });
  }, []);

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <Image
        source={require('../assets/images/splash-icon.png')}
        style={styles.logo}
        resizeMode="contain"
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
  },
  logo: {
    width: 220,
    height: 220,
  },
});
