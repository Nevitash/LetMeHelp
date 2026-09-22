import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <View>
          <Text>Hello, World!</Text>
        </View>
      </SafeAreaView>
    </View>
  );
}


