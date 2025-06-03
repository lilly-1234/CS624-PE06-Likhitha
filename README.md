# CS624-PE06-Likhitha

# Cities with Countries and Currency App

This React Native app allows users to add and manage cities along with their countries and also maintain a list of countries and currencies with detailed notes. The application uses React Navigation with a bottom tab navigator and native stack navigation.

## Input

Users interact with the app through the following inputs:

- **Add City**
  - City name 
  - Country name 

- **Add Country**
  - Country name 
  - Currency 

- **Add Location to City**
  - Location name 
  - Location info 

- **Add Currency Info to Country**
  - Currency name 
  - Currency info 

- **Navigation**
  - Users can navigate between four main tabs:
    - Cities
    - AddCity
    - AddCountry
    - Countries

## Process

1. **State Management**
   - Cities and countries are stored in the component state of the root `App.js`.
   - Each city object includes `id`, `city`, `country`, and `locations: []`.
   - Each country object includes `id`, `country`, `currency` and `Note:[]`.

2. **Adding Data**
   - When a user submits a new city or country, a UUID is generated using `react-native-uuid` and the item is added to the state.
   - Locations and currency notes are added to their respective city/country object.
   - After submission, the input fields are cleared, and navigation optionally routes the user to the relevant screen.

3. **Navigation**
   - The app uses `@react-navigation/native` with a `BottomTabNavigator` for major views.
   - The `Cities` tab uses a nested `NativeStackNavigator` to allow deep navigation from a list of cities to individual city detail screens.
   - The `Countries` tab also uses a nested stack to allow navigation to detailed country screens with currency notes.

4. **Data Display**
   - Cities and countries are listed using `ScrollView`.
   - If the list is empty, a `CenterMessage` component displays a fallback message.
   - Nested details (like locations or currency info) are also displayed using styled scrollable lists.

## Output

- **Cities Tab**: Displays a scrollable list of added cities and their countries.
- **City Detail**: Allows users to add locations to a selected city.
- **AddCity Tab**: Presents a form to input city and country names.
- **AddCountry Tab**: Presents a form to input country and currency.
- **Countries Tab**: Displays a scrollable list of all added countries with their currencies.
- **Country Detail**: Allows users to add currency-related info to a selected country.

Each view is styled using React Native's `StyleSheet` and customized via a centralized `theme.js` for consistent UI.
