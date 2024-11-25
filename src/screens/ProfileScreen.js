import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
  Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute, useNavigation } from '@react-navigation/native';
import * as ImageManipulator from 'expo-image-manipulator';
import AnimatedGrid from '../components/AnimatedGrid';

const ProfileScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { name: nameFromRoute, email: emailFromRoute } = route.params || {};

  const [profileImage, setProfileImage] = useState(null);
  const [name, setName] = useState(nameFromRoute || '');
  const [email, setEmail] = useState(emailFromRoute || '');
  const [bio, setBio] = useState('Travel Enthusiast & Journal Lover');

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const storedName = await AsyncStorage.getItem('userName');
        const storedEmail = await AsyncStorage.getItem('userEmail');
        const storedProfileImage = await AsyncStorage.getItem('profileImage');

        if (storedName) setName(storedName);
        if (storedEmail) setEmail(storedEmail);
        if (storedProfileImage) setProfileImage(storedProfileImage);
      } catch (error) {
        console.error('Error loading user data', error);
      }
    };

    loadUserData();
  }, []);

  const pickImage = async () => {
    const { status: mediaLibraryStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();

    if (mediaLibraryStatus !== 'granted' || cameraStatus !== 'granted') {
      Alert.alert('Permissions needed', 'Camera and media library permissions are required!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      
      try {
        const manipResult = await ImageManipulator.manipulateAsync(
          uri,
          [{ resize: { width: 500, height: 500 } }],
          { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG }
        );

        await AsyncStorage.setItem('profileImage', manipResult.uri);
        setProfileImage(manipResult.uri);
      } catch (error) {
        console.error('Image processing error:', error);
        Alert.alert('Error', 'Failed to process image');
      }
    }
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.multiRemove(['userName', 'userEmail', 'profileImage']);
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    } catch (error) {
      console.error('Logout error', error);
    }
  };

  const handleEditProfile = () => {
    navigation.navigate('EditProfile', {
      name,
      email,
      bio,
      profileImage,
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <AnimatedGrid />
      <Text style={styles.title}>My Profile</Text>

      <View style={styles.profileCard}>
        <TouchableOpacity onPress={pickImage} style={styles.profileImageContainer}>
          <Image
            source={{ uri: profileImage || 'https://via.placeholder.com/150' }}
            style={styles.profileImage}
          />
          <View style={styles.cameraIconOverlay}>
            <Icon name="camera-alt" size={24} color="#fff" />
          </View>
        </TouchableOpacity>

        <Text style={styles.profileName}>{name}</Text>
        <Text style={styles.profileDetail}>{email}</Text>
        <Text style={styles.profileBio}>{bio}</Text>

        <View style={styles.actions}>
          <TouchableOpacity style={styles.actionButton} onPress={handleEditProfile}>
            <Icon name="edit" size={20} color="#fff" />
            <Text style={styles.actionButtonText}>Edit Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={handleLogout}>
            <Icon name="logout" size={20} color="#fff" />
            <Text style={styles.actionButtonText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0A0A1A', // Deep midnight black
  },
  title: {
    fontSize: 28,
    color: '#8A4FFF', // Vibrant purple
    textAlign: 'center',
    marginVertical: 20,
    fontWeight: '600',
  },
  profileCard: {
    backgroundColor: 'rgba(70,0,100,0.6)', // Deep violet with transparency
    borderRadius: 20,
    margin: 20,
    padding: 25,
    alignItems: 'center',
    shadowColor: '#8A4FFF', // Matching purple shadow
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 15,
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: 15,
  },
  profileImage: {
    width: 180,
    height: 180,
    borderRadius: 90,
    borderWidth: 4,
    borderColor: '#8A4FFF', // Vibrant purple border
  },
  cameraIconOverlay: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: 'rgba(0,0,0,0.7)',
    borderRadius: 25,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileName: {
    fontSize: 24,
    color: '#B98EFF', // Soft lavender
    fontWeight: 'bold',
    marginBottom: 5,
  },
  profileDetail: {
    fontSize: 16,
    color: '#D1C4E9', // Light violet
    marginBottom: 10,
  },
  profileBio: {
    fontSize: 14,
    color: '#9C27B0', // Deep purple
    textAlign: 'center',
    marginBottom: 20,
    fontStyle: 'italic',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
  },
  actionButton: {
    backgroundColor: 'rgba(142,36,170,0.8)', // Rich purple
    padding: 12,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    flex: 0.48,
    justifyContent: 'center',
  },
  actionButtonText: {
    color: '#FFFFFF', // Clean white text
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

export default ProfileScreen;