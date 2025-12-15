import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Ionicons } from "@expo/vector-icons";
import { Platform } from 'react-native';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Ratings',
          tabBarIcon: ({ color, focused }) => 
            Platform.OS === 'ios' ? (
              <Ionicons name={focused ? "star" : "star-outline"} size={24} color={color} />
            ) : (
              <Ionicons name={focused ? "star" : "star-outline"} size={20} color={color} />
            ),
        }}
      />
    </Tabs>
  );
}
