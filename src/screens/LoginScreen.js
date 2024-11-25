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
                placeholderTextColor="rgba(255,255,255,0.5)"
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
                placeholderTextColor="rgba(255,255,255,0.5)"
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
    backgroundColor: 'rgba(147, 51, 234,0.3)',
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
  signupLink: {
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
  },
});

export default LoginScreen;
