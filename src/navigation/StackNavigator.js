import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNavigator from "./TabNavigator";
import DetailScreen from "../screens/DetailScreen";
import BrowseScreen from "../screens/BrowseScreen";

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="MainTabs" 
        component={TabNavigator} 
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Detail" component={DetailScreen} />
      <Stack.Screen name="Browse" component={BrowseScreen} />
    </Stack.Navigator>
  );
}