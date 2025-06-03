import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import uuid from 'react-native-uuid';
import { colors } from '../theme'; 

class AddCity extends React.Component {
  state = {
    city: '',
    country: '',
  };

  onChangeText = (key, value) => {
    this.setState({ [key]: value });
  };

  submit = () => {
    const { city, country } = this.state;
    if (!city || !country) {
      alert('Please complete the form');
      return;
    }

    const newCity = {
      id: uuid.v4(),
      city,
      country,
      locations: [],
    };

    this.props.addCity(newCity);
    this.setState({ city: '', country: '' }, () => {
      this.props.navigation.navigate('Cities');
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>Add City</Text>
        <TextInput
          placeholder="City"
          style={styles.input}
          value={this.state.city}
          onChangeText={(val) => this.onChangeText('city', val)}
        />
        <TextInput
          placeholder="Country"
          style={styles.input}
          value={this.state.country}
          onChangeText={(val) => this.onChangeText('country', val)}
        />
        <TouchableOpacity onPress={this.submit}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Add City</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary, 
    justifyContent: 'center',
  },
  heading: {
    fontSize: 30,
    color: 'white',
    alignSelf: 'center',
    marginBottom: 20,
  },
  input: {
    backgroundColor: 'white',
    height: 50,
    margin: 10,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#666',
    height: 50,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default AddCity;
