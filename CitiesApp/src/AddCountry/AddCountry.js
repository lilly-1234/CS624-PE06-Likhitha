import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import uuid from 'react-native-uuid';
import { colors } from '../theme';

// Class component for the AddCountry screen
class AddCountry extends React.Component {
  state = {
    country: '',
    currency: '',
  };

  onChangeText = (key, value) => {
    this.setState({ [key]: value });
  };

  // Submit handler to add a new country to parent state
  submit = () => {
    const { country, currency } = this.state;
    // Form validation: both fields must be filled
    if (country === '' || currency === '') {
      alert('Please complete the form');
      return;
    }
    
    // Create a new country object with a unique ID
    const newCountry = {
      id: uuid.v4(),
      country,
      currency,
    };

    // Pass the new country object up to the parent component
    this.props.addCountry(newCountry);
    
    // Clear form inputs and navigate to Countries tab
    this.setState(
      {
        country: '',
        currency: '',
      },
      () => {
        this.props.navigation.navigate('Countries');
      }
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>Countries</Text>
        <TextInput
          placeholder="Country name"
          onChangeText={(val) => this.onChangeText('country', val)}
          style={styles.input}
          value={this.state.country}
        />
        <TextInput
          placeholder="Currency"
          onChangeText={(val) => this.onChangeText('currency', val)}
          style={styles.input}
          value={this.state.currency}
        />
        <TouchableOpacity onPress={this.submit}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Add Country</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    height: 50,
    backgroundColor: '#666',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  heading: {
    color: 'white',
    fontSize: 40,
    marginBottom: 10,
    alignSelf: 'center',
  },
  container: {
    backgroundColor: colors.primary,
    flex: 1,
    justifyContent: 'center',
  },
  input: {
    margin: 10,
    backgroundColor: 'white',
    paddingHorizontal: 8,
    height: 50,
  },
});

export default AddCountry;
