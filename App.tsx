import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import fonts from './config/fonts';
import { useFonts } from "expo-font";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import RootNavigator from './navigators/RootNavigator';
import { AuthProvider } from './utils/context/AuthContext';


export default function App() {
  const [fontsLoaded] = useFonts(fonts);

  return !fontsLoaded ? null : (
    <AuthProvider>
      <SafeAreaProvider style={{ flex: 1 }} >
        <GestureHandlerRootView style={{ flex: 1 }}>
          <RootNavigator />
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </AuthProvider>
  );
}
