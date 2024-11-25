import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  StatusBar,
  Animated,
} from 'react-native';

// Separate AnimatedGrid component
const AnimatedGrid = () => {
  const [translateX] = useState(new Animated.Value(0));
  const [translateY] = useState(new Animated.Value(0));
  
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  
  const lineSpacing = 40;
  const numHorizontalLines = Math.ceil(windowHeight / lineSpacing) + 1;
  const numVerticalLines = Math.ceil(windowWidth / lineSpacing) + 1;

  useEffect(() => {
    const createAnimation = (value) => {
      return Animated.loop(
        Animated.sequence([
          Animated.timing(value, {
            toValue: lineSpacing,
            duration: 8000,
            useNativeDriver: true,
          }),
          Animated.timing(value, {
            toValue: 0,
            duration: 0,
            useNativeDriver: true,
          }),
        ])
      );
    };

    const animationGroup = Animated.parallel([
      createAnimation(translateX),
      createAnimation(translateY)
    ]);
    
    animationGroup.start();

    return () => {
      animationGroup.stop();
    };
  }, []);

  const renderHorizontalLines = () => {
    return Array(numHorizontalLines).fill(0).map((_, index) => (
      <Animated.View
        key={`h-${index}`}
        style={[
          styles.line,
          styles.horizontalLine,
          {
            top: index * lineSpacing,
            transform: [{ translateY: translateY }]
          }
        ]}
      />
    ));
  };

  const renderVerticalLines = () => {
    return Array(numVerticalLines).fill(0).map((_, index) => (
      <Animated.View
        key={`v-${index}`}
        style={[
          styles.line,
          styles.verticalLine,
          {
            left: index * lineSpacing,
            transform: [{ translateX: translateX }]
          }
        ]}
      />
    ));
  };

  return (
    <View style={[styles.gridContainer]}>
      {renderHorizontalLines()}
      {renderVerticalLines()}
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#17012B',
    },
    line: {
      position: 'absolute',
      backgroundColor: 'rgba(147, 51, 234, 0.15)',
    },
    horizontalLine: {
      width: '100%',
      height: 1,
    },
    verticalLine: {
      width: 1,
      height: '100%',
    },
    gridContainer: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'transparent',
    },
    
   
     
  });
  
  export default AnimatedGrid;