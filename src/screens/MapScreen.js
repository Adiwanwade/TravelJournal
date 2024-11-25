import React from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useSelector } from 'react-redux';

const MapScreen = () => {
  const journalEntries = useSelector((state) => state.journal.entries);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 37.7749,
          longitude: -122.4194,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        {journalEntries.map((entry, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: entry.location.latitude,
              longitude: entry.location.longitude,
            }}
            title={entry.text}
          />
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});

export default MapScreen;
