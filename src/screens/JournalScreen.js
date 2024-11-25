import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, StyleSheet, Image, SafeAreaView, Modal, Dimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FastImage from 'react-native-fast-image';
import * as ImagePicker from 'expo-image-picker';
import MapView, { Marker } from 'react-native-maps';
import AnimatedGrid from '../components/AnimatedGrid';
import { useRoute } from '@react-navigation/native'; 
const { width, height } = Dimensions.get('window');

const JournalScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const journalEntries = useSelector((state) => state.journal.entries);
  const [newEntry, setNewEntry] = useState('');
  const [photo, setPhoto] = useState(null);
  const [locationModal, setLocationModal] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [expandedEntryId, setExpandedEntryId] = useState(null);
  const [detailedNote, setDetailedNote] = useState('');
  const [imagePreviewModal, setImagePreviewModal] = useState(false);
  const [currentPreviewImage, setCurrentPreviewImage] = useState(null);
  const route = useRoute();
  const { name: nameFromRoute, email : emailFromRoute} = route.params || {};
  const addEntry = () => {
    if (!newEntry.trim()) return;

    dispatch({
      type: 'ADD_ENTRY',
      payload: {
        id: Date.now().toString(),
        text: newEntry,
        detailedNote: detailedNote,
        photo,
        location: selectedLocation,
        date: new Date().toISOString(),
      },
    });
    setNewEntry('');
    setDetailedNote('');
    setPhoto(null);
    setSelectedLocation(null);
  };

  const deleteEntry = (id) => {
    dispatch({ type: 'DELETE_ENTRY', payload: id });
  };

  const pickImage = async () => {
    const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();
    const { status: mediaStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  
    if (cameraStatus !== 'granted' || mediaStatus !== 'granted') {
      alert('Permission to access camera and media library is required!');
      return;
    }
  
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
  
    console.log('Full Image Picker Result:', JSON.stringify(result));
  
    if (!result.canceled && result.assets && result.assets[0].uri) {
      setPhoto(result.assets[0].uri);
    }
  };

  const handleMapPress = (e) => {
    setSelectedLocation(e.nativeEvent.coordinate);
    setLocationModal(false);
  };

  const goToProfile = () => {
    navigation.navigate('Profile',{
      name:nameFromRoute,
      email:emailFromRoute,
    });
  };

  const openImagePreview = (imageUri) => {
    setCurrentPreviewImage(imageUri);
    setImagePreviewModal(true);
  };

  const renderLocationModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={locationModal}
      onRequestClose={() => setLocationModal(false)}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Select Location</Text>
          <MapView
            style={styles.fullMap}
            initialRegion={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            onPress={handleMapPress}
          >
            {selectedLocation && (
              <Marker
                coordinate={selectedLocation}
                pinColor="#8e44ad"
              />
            )}
          </MapView>
          <TouchableOpacity 
            style={styles.modalCloseButton} 
            onPress={() => setLocationModal(false)}
          >
            <Text style={styles.modalCloseText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  const renderImagePreviewModal = () => (
    <Modal
      animationType="fade"
      transparent={true}
      visible={imagePreviewModal}
      onRequestClose={() => setImagePreviewModal(false)}
    >
      <TouchableOpacity 
        style={styles.imagePreviewContainer} 
        onPress={() => setImagePreviewModal(false)}
      >
        <Image 
          source={{ uri: currentPreviewImage }} 
          style={styles.fullScreenImage}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </Modal>
  );

  return (
    <SafeAreaView style={styles.container}>
      <AnimatedGrid />
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Travel Memories</Text>
        <TouchableOpacity onPress={goToProfile} style={styles.profileIconButton}>
          <Icon name="person" size={30} color="#fff" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={journalEntries}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.cardContainer}
            onPress={() => setExpandedEntryId(expandedEntryId === item.id ? null : item.id)}
          >
            <View style={styles.card}>
              {item.photo && (
                <TouchableOpacity onPress={() => openImagePreview(item.photo)}>
                  <Image 
                    source={{ uri: item.photo }} 
                    style={styles.cardImage} 
                  />
                </TouchableOpacity>
              )}
              <View style={styles.cardTextContainer}>
                <Text style={styles.cardTitle}>{item.text}</Text>
                <Text style={styles.cardDate}>
                  {new Date(item.date).toLocaleDateString()}
                </Text>
              </View>
              <TouchableOpacity 
                onPress={() => deleteEntry(item.id)} 
                style={styles.deleteButton}
              >
                <Icon name="delete" size={24} color="#ff6b6b" />
              </TouchableOpacity>
            </View>

            {expandedEntryId === item.id && (
              <View style={styles.expandedContent}>
                {item.detailedNote && (
                  <Text style={styles.detailedNoteText}>
                    {item.detailedNote}
                  </Text>
                )}
                {item.location && (
                  <MapView
                    style={styles.compactMap}
                    initialRegion={{
                      ...item.location,
                      latitudeDelta: 0.01,
                      longitudeDelta: 0.01,
                    }}
                  >
                    <Marker coordinate={item.location} />
                  </MapView>
                )}
                {item.photo && (
  <TouchableOpacity onPress={() => openImagePreview(item.photo)}>
    <Image 
      source={{ uri: item.photo }} 
      style={styles.cardImage} 
      resizeMode="cover"
    />
  </TouchableOpacity>
)}
              </View>
            )}
          </TouchableOpacity>
        )}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.quickNoteInput}
          placeholder="Quick memory note..."
          placeholderTextColor="#a4a4a4"
          value={newEntry}
          onChangeText={setNewEntry}
        />
        <TextInput
          style={styles.detailedNoteInput}
          placeholder="Detailed memories..."
          placeholderTextColor="#a4a4a4"
          multiline
          value={detailedNote}
          onChangeText={setDetailedNote}
        />
        <View style={styles.actionButtonsContainer}>
          {photo && (
            <View style={styles.photoPreviewContainer}>
              <TouchableOpacity onPress={() => openImagePreview(photo)}>
                <Image 
                  source={{ uri: photo }} 
                  style={styles.photoPreview} 
                />
              </TouchableOpacity>
              <TouchableOpacity 
                onPress={() => setPhoto(null)} 
                style={styles.removePhotoButton}
              >
                <Icon name="close" size={20} color="#fff" />
              </TouchableOpacity>
            </View>
          )}
          <TouchableOpacity 
            style={styles.actionButton} 
            onPress={pickImage}
          >
            <Icon name="photo-library" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.actionButton} 
            onPress={() => setLocationModal(true)}
          >
            <Icon name="location-on" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.addButton} 
            onPress={addEntry}
          >
            <Text style={styles.addButtonText}>Add Memory</Text>
          </TouchableOpacity>
        </View>
      </View>

      {renderLocationModal()}
      {renderImagePreviewModal()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
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
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  profileIconButton: {
    position:'absolute',
    left: 15,
    top: 28,
    backgroundColor: '#8e44ad',
    borderRadius: 50,
  },
  title: {
    flex: 1,
    fontSize: 32,
    fontWeight: 'bold',
    color: '#e0aaff',
    textAlign: 'center',
    marginVertical: 20,
    textShadowColor: 'rgba(224, 170, 255, 0.5)',
    textShadowOffset: { width: 0, height: 3 },
    textShadowRadius: 6,
  },
  cardContainer: {
    marginHorizontal: 15,
    marginVertical: 10,
    borderRadius: 15,
    overflow: 'hidden',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#1e1e2a',
    padding: 15,
    alignItems: 'center',
  },
  cardImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 15,
    marginTop: 15,
  },
  cardTextContainer: {
    flex: 1,
  },
  cardTitle: {
    color: '#e0e0e0',
    fontSize: 18,
    fontWeight: '600',
  },
  cardDate: {
    color: '#8e44ad',
    fontSize: 14,
  },
  deleteButton: {
    padding: 10,
  },
  expandedContent: {
    backgroundColor: '#1e1e2a',
    padding: 15,
  },
  detailedNoteText: {
    color: '#a4a4a4',
    marginBottom: 10,
  },
  compactMap: {
    height: 150,
    borderRadius: 10,
  },
  inputContainer: {
    backgroundColor: '#1e1e2a',
    padding: 15,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  quickNoteInput: {
    backgroundColor: '#2c2c3e',
    color: '#fff',
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
  },
  detailedNoteInput: {
    backgroundColor: '#2c2c3e',
    color: '#fff',
    borderRadius: 10,
    padding: 12,
    minHeight: 100,
    marginBottom: 10,
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  actionButton: {
    backgroundColor: '#8e44ad',
    padding: 12,
    borderRadius: 50,
  },
  addButton: {
    backgroundColor: '#6a3093',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 15,
    flex: 1,
    marginLeft: 10,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#1e1e2a',
    margin: 20,
    borderRadius: 20,
    overflow: 'hidden',
  },
  modalTitle: {
    color: '#e0aaff',
    fontSize: 20,
    textAlign: 'center',
    padding: 15,
    backgroundColor: '#8e44ad',
  },
  fullMap: {
    width: '100%',
    height: height * 0.6,
  },
  modalCloseButton: {
    backgroundColor: '#6a3093',
    padding: 15,
    alignItems: 'center',
  },
  modalCloseText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  
  imagePreviewContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullScreenImage: {
    width: '100%',
    height: '100%',
  },
  photoPreviewContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  photoPreview: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 10,
  },
  removePhotoButton: {
    backgroundColor: '#ff6b6b',
    borderRadius: 15,
    padding: 5,
  },
});

export default JournalScreen;