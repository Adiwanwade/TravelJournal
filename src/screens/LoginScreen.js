import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  Dimensions,
} from 'react-native';
import { Animated } from 'react-native-maps';
import { useRoute } from '@react-navigation/native'; 
import { useDispatch } from 'react-redux';
import AnimatedGrid from './../components/AnimatedGrid';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const route = useRoute();
  const { name: nameFromRoute, email: emailFromRoute } = route.params || {};
  const handleLogin = () => {
    if (!email || !password) {
      alert('Please fill in all fields');
      return;
    }
    dispatch({ type: 'LOGIN', payload: { email } });
    navigation.navigate('Journal',{
      name:'name',
      email:'email',
    });
  };

  return (
    <SafeAreaView style={[styles.container, { width: windowWidth, height: windowHeight }]}>
      <StatusBar barStyle="light-content" />
      <AnimatedGrid />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <View style={styles.formContainer}>
          <View style={styles.headerContainer}>
            <Text style={styles.title}>Welcome Back</Text>
            <Text style={styles.subtitle}>Login to your account</Text>
          </View>

          <View style={styles.inputContainer}>
            <View style={styles.inputWrapper}>
              <Text style={styles.label}>EMAIL</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your email"
                placeholderTextColor="rgba(255,255,255,0.8)"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
                autoCorrect={false}
              />
            </View>

            <View style={styles.inputWrapper}>
              <Text style={styles.label}>PASSWORD</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your password"
                placeholderTextColor="rgba(255,255,255,0.8)"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                autoCapitalize="none"
              />
            </View>
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={handleLogin}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('Register')}
            style={styles.signupLink}
            activeOpacity={0.7}
          >
            <Text style={styles.linkText}>
              Don't have an account? <Text style={styles.linkTextBold}>Sign Up</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  
    container: {
      flex: 1,
      backgroundColor: '#1A0B2E', // Deep, rich purple-navy base
      backgroundImage: 'linear-gradient(to bottom right, #1A0B2E, #3B0764)', // Subtle gradient
    },
    glassContainer: {
      backgroundColor: 'rgba(255, 255, 255, 0.05)', // Ultra-light glassmorphism
      borderWidth: 1,
      borderColor: 'rgba(255, 255, 255, 0.1)',
      borderRadius: 24,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 8
      },
      shadowOpacity: 0.15,
      shadowRadius: 12,
      elevation: 8,
    },
    keyboardView: {
      flex: 1,
      backgroundColor: 'transparent',
    },
    formContainer: {
      flex: 1,
      padding: 24,
      justifyContent: 'center',
      backgroundColor: 'transparent',
    },
    headerContainer: {
      marginBottom: 50,
      alignItems: 'center',
    },
    title: {
      fontSize: 40,
      fontWeight: '800', // Extra bold
      color: '#ffffff',
      textAlign: 'center',
      marginBottom: 12,
      letterSpacing: 0.8,
      textShadowColor: 'rgba(168, 85, 247, 0.3)', // Soft purple glow
      textShadowOffset: { width: 0, height: 2 },
      textShadowRadius: 12,
    },
    subtitle: {
      fontSize: 16,
      color: 'rgba(255,255,255,0.6)',
      textAlign: 'center',
      marginBottom: 30,
      letterSpacing: 0.5,
    },
    inputContainer: {
      marginBottom: 35,
    },
    inputWrapper: {
      marginBottom: 25,
    },
    label: {
      fontSize: 13,
      fontWeight: '700',
      color: '#A855F7', // Vibrant purple
      marginBottom: 10,
      letterSpacing: 0.6,
      textTransform: 'uppercase', // Uppercase labels for modern look
    },
    input: {
      borderWidth: 1.5,
      borderColor: 'rgba(147, 85, 247, 0.3)', // Softer purple border
      borderRadius: 16, // Smooth rounded corners
      paddingHorizontal: 16, // Slightly increased padding for better spacing
      paddingVertical: Platform.OS === 'ios' ? 16 : 12,
      fontSize: 16,
      color: '#ffffff', // White text for better contrast
      letterSpacing: 0.5, // Slight spacing for modern appearance
      textAlignVertical: 'center', // Ensures text is vertically aligned (important for Android)
      includeFontPadding: false, // Removes unnecessary padding on Android
    
      // Glassmorphism backdrop effect
      backdropFilter: 'blur(12px)', // Increased blur intensity for a frosted glass effect
      backgroundColor: 'rgba(147, 51, 234, 0.65)', // Ultra-light purple background for extra subtlety
    
      // Shadow for depth
      shadowColor: 'rgba(147, 51, 234, 0.6)', // Subtle purple glow effect
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.2, // Reduced shadow opacity for a softer appearance
      shadowRadius: 6, // More diffused shadow
      elevation: 4, // Raised effect for Android
    
      // Focus state styles
      ':focus': {
        borderColor: 'rgba(168, 85, 247, 0.7)', // Brighter border on focus
        shadowColor: 'rgba(168, 85, 247, 0.8)', // Enhanced shadow glow
        shadowOpacity: 0.5,
        shadowRadius: 8,
        elevation: 6,
      },
    
      // Platform-specific adjustments
      ...Platform.select({
        ios: {
          borderStyle: 'solid',
          backdropFilter: 'blur(12px)', // iOS supports `backdropFilter` better
        },
        android: {
          underlineColorAndroid: 'transparent', // Ensures no underline on Android
        },
      }),
    }
    
    ,
    
    button: {
      backgroundColor: '#9333EA', // Vibrant purple
      borderRadius: 16,
      padding: 18,
      alignItems: 'center',
      justifyContent: 'center',
      // Gradient overlay
      backgroundImage: 'linear-gradient(to right, #9333EA, #A855F7)',
      // Sophisticated shadow and elevation
      shadowColor: '#9333EA',
      shadowOffset: {
        width: 0,
        height: 6
      },
      shadowOpacity: 0.4,
      shadowRadius: 8,
      elevation: 10,
      // Hover/press state
      ':active': {
        opacity: 0.8,
        transform: [{ scale: 0.98 }]
      }
    },
    buttonText: {
      color: '#ffffff',
      fontSize: 17,
      fontWeight: '800', // Extra bold
      letterSpacing: 0.8,
      textTransform: 'uppercase', // Uppercase button text
    },
    signupLink: {
      marginTop: 25,
      alignItems: 'center',
    },
    linkText: {
      color: 'rgba(255,255,255,0.6)',
      fontSize: 15,
      letterSpacing: 0.5,
    },
    linkTextBold: {
      color: '#A855F7', // Vibrant purple
      fontWeight: '800', // Extra bold
      letterSpacing: 0.6,
      // Subtle hover/press effect
      ':active': {
        opacity: 0.7,
      }
    },
    // Additional decorative elements
    backgroundDecoration: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      opacity: 0.1,
      zIndex: -1,
      // Potential for a subtle animated or gradient background
    },
});

export default LoginScreen;
