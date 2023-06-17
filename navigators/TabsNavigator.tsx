import { BottomTabScreenProps, createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { CompositeScreenProps } from "@react-navigation/native";
import { RootStackScreenProps } from "./RootNavigator";
import CustomBottomTabs from "../components/CustomBottomTabs";
import HomeScreen from "../screens/HomeScreen";
import { AntDesign } from "@expo/vector-icons";
import OrderScreen from "../screens/OrderScreen";
import CartScreen from "../screens/CartScreen";
import NotifScreen from "../screens/NotifScreen";
import ProfileScreen from "../screens/ProfileScreen";


export type TabsStackParamList = {
    home: undefined;
    order: undefined;
    // cart: undefined;
    notif: undefined;
    profile: undefined;
};

const TabsStack = createBottomTabNavigator<TabsStackParamList>();
export type TabsStackScreenProps<T extends keyof TabsStackParamList> =
    CompositeScreenProps<
        BottomTabScreenProps<TabsStackParamList, T>,
        RootStackScreenProps<"tabs">
    >;



export default function TabsNavigator() {
    return (
        <TabsStack.Navigator screenOptions={{ tabBarShowLabel: false }}
            tabBar={(props) => <CustomBottomTabs {...props} />}
        >
            <TabsStack.Screen name="home" component={HomeScreen} options={{ headerShown: false, tabBarIcon(props) { return <AntDesign name="home" {...props} /> }, }} />
            <TabsStack.Screen name="order" component={OrderScreen} options={{ headerShown: false, tabBarIcon(props) { return <AntDesign name="home" {...props} /> }, }} />
            {/* <TabsStack.Screen name="cart" component={CartScreen} options={{ headerShown: false, tabBarIcon(props) { return <AntDesign name="home" {...props} /> }, }} /> */}
            <TabsStack.Screen name="notif" component={NotifScreen} options={{ headerShown: false, tabBarIcon(props) { return <AntDesign name="home" {...props} /> }, }} />
            <TabsStack.Screen name="profile" component={ProfileScreen} options={{ headerShown: false, tabBarIcon(props) { return <AntDesign name="home" {...props} /> }, }} />

        </TabsStack.Navigator>
    )
}