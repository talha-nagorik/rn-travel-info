import { Stack } from 'expo-router';
import React from 'react';

export default function DestinationsLayout() {
  return (
    <Stack
      screenOptions={{
        headerLargeTitle: true,
        headerTransparent: false,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: 'Destinations',
        }}
      />
      <Stack.Screen
        name="[id]"
        options={{
          title: '',
          headerBackTitle: 'Back',
        }}
      />
    </Stack>
  );
}

