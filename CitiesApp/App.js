import { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LogBox } from 'react-native';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

import Cities from './src/Cities/Cities';
import City from './src/Cities/City';
import AddCity from './src/AddCity/AddCity';
import AddCountry from './src/AddCountry/AddCountry';
import Countries from './src/AddCountry/Countries';
import Country from './src/AddCountry/Country';
import { colors } from './src/theme';

// Create Tab and Stack navigators
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Cities navigation stack (Cities to City Detail)
const CitiesStackScreen = ({ cities, addCity, addLocation }) => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: { backgroundColor: colors.primary },
      headerTintColor: '#fff',
    }}
  >
    <Stack.Screen
      name="Cities"
      children={(props) => (
        <Cities {...props} cities={cities} addCity={addCity} addLocation={addLocation} />
      )}
    />
    <Stack.Screen
      name="City"
      children={(props) => (
        <City {...props} cities={cities} addCity={addCity} addLocation={addLocation} />
      )}
    />
  </Stack.Navigator>
);

// // Countries navigation stack (Countries to Country Detail)
const CountriesStackScreen = ({ countries, addCurrencyInfo }) => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: { backgroundColor: colors.primary },
      headerTintColor: '#fff',
    }}
  >
    <Stack.Screen
      name="Countries"
      children={(props) => (
        <Countries
          {...props}
          countries={countries}
          addCurrencyInfo={addCurrencyInfo}
        />
      )}
    />
    <Stack.Screen
      name="Country"
      children={(props) => (
        <Country
          {...props}
          countries={countries}
          addCurrencyInfo={addCurrencyInfo}
        />
      )}
    />
  </Stack.Navigator>
);

// Main App Component
const App = () => {
  // State for cities and countries
  const [cities, setCities] = useState([]);
  const [countries, setCountries] = useState([]);
  
  // Add a new city with empty locations array
  const addCity = (city) => {
    setCities((prev) => [...prev, { ...city, locations: [] }]);
  };
  
  // Add a new location to a specific city
  const addLocation = (location, city) => {
    const index = cities.findIndex((item) => item.id === city.id);
    const updatedCity = {
      ...cities[index],
      locations: [...cities[index].locations, location],
    };

    const updatedCities = [
      ...cities.slice(0, index),
      updatedCity,
      ...cities.slice(index + 1),
    ];

    setCities(updatedCities);
  };
  
  // Add a new country with empty notes array for currency info
  const addCountry = (country) => {
    setCountries((prev) => [...prev, { ...country, notes: [] }]);
  };

  const addCurrencyInfo = (note, country) => {
    const index = countries.findIndex((item) => item.id === country.id);
    const updatedCountry = {
      ...countries[index],
      notes: [...(countries[index].notes || []), note],
    };

    const updatedCountries = [
      ...countries.slice(0, index),
      updatedCountry,
      ...countries.slice(index + 1),
    ];

    setCountries(updatedCountries);
  };
  
  // Return the entire app UI with tab navigation
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="CitiesNav"
          children={(props) => (
            <CitiesStackScreen
              {...props}
              cities={cities}
              addCity={addCity}
              addLocation={addLocation}
            />
          )}
        />
        <Tab.Screen
          name="AddCity"
          children={(props) => (
            <AddCity {...props} cities={cities} addCity={addCity} />
          )}
        />
        <Tab.Screen
          name="AddCountry"
          children={(props) => (
            <AddCountry {...props} countries={countries} addCountry={addCountry} />
          )}
        />
        <Tab.Screen
          name="CountriesNav"
          children={(props) => (
            <CountriesStackScreen
              {...props}
              countries={countries}
              addCurrencyInfo={addCurrencyInfo}
            />
          )}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
