import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import CenterMessage from '../components/CenterMessage';
import { colors } from '../theme';

// Define the Countries component as a class
export default class Countries extends React.Component {
  render() {
    const { countries } = this.props;
    return (
      <ScrollView contentContainerStyle={[!countries.length && { flex: 1 }]}>
        {/* If no countries are available, center the message vertically */}
        <View style={[!countries.length && { justifyContent: 'center', flex: 1 }]}>
          {/* Show fallback message when no countries exist */}
          {!countries.length && <CenterMessage message="No saved countries!" />}

          {/* Map through the countries list and render each country */}
          {countries.map((item, index) => (
            <View style={styles.countryContainer} key={index}>
              <Text style={styles.country}>{item.country}</Text>
              <Text style={styles.currency}>{item.currency}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    );
  }
}


// Define styles for the component
const styles = StyleSheet.create({
  countryContainer: {
    padding: 10,
    borderBottomWidth: 2,
    borderBottomColor: colors.primary,
  },
  country: {
    fontSize: 20,
  },
  currency: {
    color: 'rgba(0, 0, 0, .5)',
  },
});
