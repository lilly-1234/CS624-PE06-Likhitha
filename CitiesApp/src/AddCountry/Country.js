import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import CenterMessage from '../components/CenterMessage';
import { colors } from '../theme';

// Functional component for displaying and adding currency info for a country
const Country = ({ route }) => {
  // Destructure data passed via navigation
  const { country, countries, addCurrencyInfo } = route.params;

  const [name, setName] = useState('');
  const [info, setInfo] = useState('');
  
  // Handle submission of new currency info
  const handleAddCurrency = () => {
    if (!name || !info) return;

    const currency = { name, info };
    // Call parent's function to update currency data
    addCurrencyInfo(currency, country);
    
    // Clear input fields after adding
    setName('');
    setInfo('');
  };

  
  const updatedCountry = countries.find((item) => item.id === country.id) || country;

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={[!updatedCountry.notes?.length && { flex: 1 }]}>
        <View
          style={[
            styles.currencyList,
            !updatedCountry.notes?.length && { flex: 1, justifyContent: 'center' },
          ]}
        >
          {!updatedCountry.notes?.length && (
            <CenterMessage message="No currency info for this country!" />
          )}
          {updatedCountry.notes?.map((currency, index) => (
            <View key={index} style={styles.currencyContainer}>
              <Text style={styles.currencyName}>{currency.name}</Text>
              <Text style={styles.currencyInfo}>{currency.info}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Input for currency name */}
      <TextInput
        onChangeText={setName}
        placeholder="Currency Name"
        value={name}
        style={styles.input}
        placeholderTextColor="white"
      />

    {/* Input for currency description/info */}
      <TextInput
        onChangeText={setInfo}
        placeholder="Currency Info"
        value={info}
        style={[styles.input, styles.input2]}
        placeholderTextColor="white"
      />

      {/* Button to trigger addCurrency */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleAddCurrency}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Add Currency</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Styles for the Country screen
const styles = StyleSheet.create({
  currencyList: {
    paddingBottom: 104,
  },
  input: {
    height: 50,
    backgroundColor: colors.primary,
    color: 'white',
    paddingHorizontal: 8,
    position: 'absolute',
    width: '100%',
    bottom: 104,
    left: 0,
  },
  input2: {
    bottom: 52,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
  },
  button: {
    height: 50,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
  },
  currencyContainer: {
    padding: 10,
    borderBottomColor: colors.primary,
    borderBottomWidth: 2,
  },
  currencyName: {
    fontSize: 20,
  },
  currencyInfo: {
    color: 'rgba(0, 0, 0, .5)',
  },
});

export default Country;
