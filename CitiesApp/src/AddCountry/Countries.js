import { useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import CenterMessage from '../components/CenterMessage';
import { colors } from '../theme';

// Functional component to display the list of countries
const Countries = ({ countries, navigation, addCurrencyInfo }) => {
  
  // Navigate to Country screen with required data
  const navigateToCountry = useCallback((country) => {
    navigation.navigate('Country', {
      country,
      countries,
      addCurrencyInfo,
    });
  }, [countries, navigation, addCurrencyInfo]);

  return (
    // Scrollable container for the countries list
    <ScrollView contentContainerStyle={[!countries.length && { flex: 1 }]}>
      <View style={[!countries.length && { justifyContent: 'center', flex: 1 }]}>
        {/* Show message when no countries are available */}
        {!countries.length && <CenterMessage message="No saved countries!" />}

        {/* Render clickable list of countries */}
        {countries.map((item, index) => (
          <TouchableOpacity key={index} onPress={() => navigateToCountry(item)}>
            <View style={styles.countryContainer}>
              <Text style={styles.country}>{item.country}</Text>
              <Text style={styles.currency}>{item.currency}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

// Styles for the Countries component
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

export default Countries;
