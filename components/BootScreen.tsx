import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Dimensions, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

interface BootScreenProps {
  onFinish: () => void;
}

export function BootScreen({ onFinish }: BootScreenProps) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const wave1 = useRef(new Animated.Value(0)).current;
  const wave2 = useRef(new Animated.Value(0)).current;
  const wave3 = useRef(new Animated.Value(0)).current;
  
  const letters = 'SLEEPI'.split('');
  const letterAnims = useRef(
    letters.map(() => ({
      translateY: new Animated.Value(0),
      rotate: new Animated.Value(0),
      scale: new Animated.Value(1),
    }))
  ).current;
  
  const particles = useRef(
    Array.from({ length: 15 }).map(() => ({
      x: new Animated.Value(Math.random() * width),
      y: new Animated.Value(height + Math.random() * 200),
      opacity: new Animated.Value(0.3 + Math.random() * 0.4),
      scale: new Animated.Value(0.5 + Math.random() * 1),
    }))
  ).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.timing(logoOpacity, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();

    Animated.loop(
      Animated.timing(wave1, {
        toValue: 1,
        duration: 2500,
        useNativeDriver: true,
      })
    ).start();

    Animated.loop(
      Animated.timing(wave2, {
        toValue: 1,
        duration: 3000,
        useNativeDriver: true,
      })
    ).start();

    Animated.loop(
      Animated.timing(wave3, {
        toValue: 1,
        duration: 3500,
        useNativeDriver: true,
      })
    ).start();

    letterAnims.forEach((anim, index) => {
      Animated.loop(
        Animated.sequence([
          Animated.delay(index * 100),
          Animated.parallel([
            Animated.sequence([
              Animated.timing(anim.translateY, {
                toValue: -15,
                duration: 800,
                useNativeDriver: true,
              }),
              Animated.timing(anim.translateY, {
                toValue: 0,
                duration: 800,
                useNativeDriver: true,
              }),
            ]),
            Animated.sequence([
              Animated.timing(anim.rotate, {
                toValue: 1,
                duration: 800,
                useNativeDriver: true,
              }),
              Animated.timing(anim.rotate, {
                toValue: 0,
                duration: 800,
                useNativeDriver: true,
              }),
            ]),
            Animated.sequence([
              Animated.timing(anim.scale, {
                toValue: 1.1,
                duration: 800,
                useNativeDriver: true,
              }),
              Animated.timing(anim.scale, {
                toValue: 1,
                duration: 800,
                useNativeDriver: true,
              }),
            ]),
          ]),
        ])
      ).start();
    });

    particles.forEach((particle, index) => {
      const duration = 4000 + Math.random() * 3000;
      const delay = Math.random() * 1000;
      
      Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.parallel([
            Animated.timing(particle.y, {
              toValue: -100,
              duration,
              useNativeDriver: true,
            }),
            Animated.sequence([
              Animated.timing(particle.opacity, {
                toValue: 0.8,
                duration: duration / 3,
                useNativeDriver: true,
              }),
              Animated.timing(particle.opacity, {
                toValue: 0,
                duration: (duration * 2) / 3,
                useNativeDriver: true,
              }),
            ]),
          ]),
          Animated.timing(particle.y, {
            toValue: height + 100,
            duration: 0,
            useNativeDriver: true,
          }),
        ])
      ).start();
    });

    const timeout = setTimeout(() => {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1.2,
          duration: 400,
          useNativeDriver: true,
        }),
      ]).start(() => {
        onFinish();
      });
    }, 2500);

    return () => {
      clearTimeout(timeout);
    };
  }, [fadeAnim, scaleAnim, logoOpacity, wave1, wave2, wave3, letterAnims, particles, onFinish]);



  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#0A1628', '#1A2A4A', '#2A3A5A']}
        style={styles.gradient}
      >
        <Animated.View
          style={[
            styles.wave,
            {
              bottom: 0,
              opacity: 0.15,
              transform: [
                {
                  translateX: wave1.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -width],
                  }),
                },
              ],
            },
          ]}
        >
          {Array.from({ length: 3 }).map((_, i) => (
            <View
              key={i}
              style={[
                styles.wavePath,
                {
                  left: i * width,
                  borderTopLeftRadius: width / 2,
                  borderTopRightRadius: width / 2,
                },
              ]}
            />
          ))}
        </Animated.View>

        <Animated.View
          style={[
            styles.wave,
            {
              bottom: 30,
              opacity: 0.1,
              transform: [
                {
                  translateX: wave2.interpolate({
                    inputRange: [0, 1],
                    outputRange: [-width, 0],
                  }),
                },
              ],
            },
          ]}
        >
          {Array.from({ length: 3 }).map((_, i) => (
            <View
              key={i}
              style={[
                styles.wavePath,
                {
                  left: i * width,
                  borderTopLeftRadius: width / 2,
                  borderTopRightRadius: width / 2,
                },
              ]}
            />
          ))}
        </Animated.View>

        <Animated.View
          style={[
            styles.wave,
            {
              bottom: 60,
              opacity: 0.08,
              transform: [
                {
                  translateX: wave3.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -width],
                  }),
                },
              ],
            },
          ]}
        >
          {Array.from({ length: 3 }).map((_, i) => (
            <View
              key={i}
              style={[
                styles.wavePath,
                {
                  left: i * width,
                  borderTopLeftRadius: width / 2,
                  borderTopRightRadius: width / 2,
                },
              ]}
            />
          ))}
        </Animated.View>

        {particles.map((particle, index) => (
          <Animated.View
            key={index}
            style={[
              styles.particle,
              {
                transform: [
                  { translateX: particle.x },
                  { translateY: particle.y },
                  { scale: particle.scale },
                ],
                opacity: particle.opacity,
              },
            ]}
          />
        ))}

        <Animated.View
          style={[
            styles.contentContainer,
            {
              opacity: logoOpacity,
            },
          ]}
        >
          <View style={styles.textContainer}>
            {letters.map((letter, index) => (
              <Animated.Text
                key={index}
                style={[
                  styles.letter,
                  {
                    transform: [
                      { translateY: letterAnims[index].translateY },
                      {
                        rotate: letterAnims[index].rotate.interpolate({
                          inputRange: [0, 1],
                          outputRange: ['0deg', '5deg'],
                        }),
                      },
                      { scale: letterAnims[index].scale },
                    ],
                  },
                ]}
              >
                {letter}
              </Animated.Text>
            ))}
          </View>
        </Animated.View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width,
    height,
    zIndex: 9999,
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  letter: {
    fontSize: 72,
    fontWeight: '700' as const,
    color: '#60A5FA',
    textShadowColor: 'rgba(96, 165, 250, 0.5)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 20,
    marginHorizontal: 2,
  },
  particle: {
    position: 'absolute',
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#60A5FA',
    shadowColor: '#60A5FA',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
  },
  wave: {
    position: 'absolute',
    width: width * 3,
    height: 150,
    flexDirection: 'row',
  },
  wavePath: {
    position: 'absolute',
    width: width,
    height: 150,
    backgroundColor: 'rgba(96, 165, 250, 0.5)',
  },
});
