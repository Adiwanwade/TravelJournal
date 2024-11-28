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

import AnimatedGrid from '../components/AnimatedGrid';

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [fadeAnim] = useState(new Animated.Value(0));
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleRegister = () => {
    if (!email || !password || !confirmPassword) {
      alert('Please fill in all fields');
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }
    if(name.length < 3){
      alert("Name must be at least 3 characters long");
      return;
    }
    // Add email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address');
      return;
    }
    navigation.navigate('Login',{
      name:name,
      email:email,
      password:password,
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
        <Animated.View 
          style={[
            styles.formContainer,
            {
              opacity: fadeAnim,
              transform: [{
                translateY: fadeAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [50, 0]
                })
              }]
            }
          ]}
        >
          <View style={styles.headerContainer}>
            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.subtitle}>Join our community today</Text>
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
              <Text style={styles.label}>Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your name"
                placeholderTextColor="rgba(255,255,255,0.8)"
                value={name}
                onChangeText={setName}
                autoCapitalize="none"
                keyboardType="default"
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

            <View style={styles.inputWrapper}>
              <Text style={styles.label}>CONFIRM PASSWORD</Text>
              <TextInput
                style={styles.input}
                placeholder="Confirm your password"
                placeholderTextColor="rgba(255,255,255,0.8)"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
                autoCapitalize="none"
              />
            </View>
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={handleRegister}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>Create Account</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('Login')}
            style={styles.loginLink}
            activeOpacity={0.7}
          >
            <Text style={styles.linkText}>
              Already have an account? <Text style={styles.linkTextBold}>Sign In</Text>
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#17012B',
    // backgroundColor: 'rgba(255, 255, 255, 0.1)', // Slight transparency
    backdropFilter: 'blur(40px)', // Glass blur effect
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)', // Light border for glass effect
    shadowColor: '#000',
    shadowOffset: { 
      width: 0, 
      height: 4 
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
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
    marginBottom: 40,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.7)',
    textAlign: 'center',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 30,
  },
  inputWrapper: {
    marginBottom: 20,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: '#A855F7',
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  input: {
    backgroundColor: 'rgba(147, 51, 234, 0.65)',
    borderRadius: 12,
    padding: Platform.OS === 'ios' ? 16 : 12,
    fontSize: 16,
    color: '#ffffff',
    borderWidth: 1,
    borderColor: 'rgba(147, 51, 234, 0.3)',
    shadowColor: '#9333EA',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3.84,
    elevation: 5,
  },
  button: {
    backgroundColor: '#9333EA',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#9333EA',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  loginLink: {
    marginTop: 20,
    alignItems: 'center',
  },
  linkText: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 14,
  },
  linkTextBold: {
    color: '#A855F7',
    fontWeight: 'bold',
  }
});

export default RegisterScreen;