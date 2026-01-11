import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { get } from '../../convex/tasks';

export default function Store() {
  const tasks = useQuery(api.tasks.get)

  return (
    <SafeAreaView>
      <Text>store</Text>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({})