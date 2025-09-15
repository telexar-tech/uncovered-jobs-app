import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CategoryScreen from "../screens/CategoryScreen";
import SubscribeScreen from "../screens/SubscribeScreen";
import BottomTabNavigator from "./BottomStackNavigator";
import { RootStackParamList } from "./types";

const MainStack = createNativeStackNavigator<RootStackParamList>();

const MainStackNavigator = () => {
  return (
    <MainStack.Navigator
      initialRouteName="Category"
      screenOptions={{ headerShown: false }}
    >
      <MainStack.Screen name="App" component={BottomTabNavigator} />
      <MainStack.Screen name="Category" component={CategoryScreen} />
      <MainStack.Screen name="Subscribe" component={SubscribeScreen} />
    </MainStack.Navigator>
  );
};

export default MainStackNavigator;