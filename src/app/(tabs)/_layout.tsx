import '@/global.css';
import { Tabs } from 'expo-router';

export default function TabsLayout(){
    return (
        <Tabs screenOptions={{ sceneStyle: { flex: 1 } }}>
            <Tabs.Screen name="index" options={{ title: 'Overview' }} />
            <Tabs.Screen name="settings" options={{ title: 'Settings' }} />
        </Tabs>
    );
}