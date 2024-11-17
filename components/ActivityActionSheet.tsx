import ActionSheet, { SheetProps } from "react-native-actions-sheet";
import { LapData } from "../types/strava";
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  StyleSheet,
} from "react-native";
import React from "react";

function ActivityActionSheet({ payload }: SheetProps<"activity-sheet">) {
  const { isLoading, activity, lapData } = payload;

  const renderLapItem = ({ item, index }: { item: LapData; index: number }) => (
    <View style={styles.lapCard}>
      <Text style={styles.lapTitle}>Lap {index + 1}</Text>
      <Text style={styles.lapInfo}>
        Max Speed: {item.maxSpeed.toFixed(1)} km/h
      </Text>
      <Text style={styles.lapInfo}>
        Min Heart Rate: {item.minHeartRate} bpm
      </Text>
      <Text style={styles.lapInfo}>
        Max Heart Rate: {item.maxHeartRate} bpm
      </Text>
      <Text style={styles.lapInfo}>Max Cadence: {item.maxCadence} rpm</Text>
      <Text style={styles.lapInfo}>
        Min Elevation: {item.minElevation.toFixed(1)}m
      </Text>
      <Text style={styles.lapInfo}>
        Max Elevation: {item.maxElevation.toFixed(1)}m
      </Text>
    </View>
  );

  return (
    <ActionSheet containerStyle={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" />
      ) : (
        <>
          <Text style={styles.title}>{activity.name}</Text>
          <FlatList
            data={lapData}
            renderItem={renderLapItem}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.listContainer}
          />
        </>
      )}
    </ActionSheet>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "60%",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  listContainer: {
    paddingBottom: 20,
  },
  lapCard: {
    backgroundColor: "#f5f5f5",
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  lapTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  lapInfo: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
});

export default ActivityActionSheet;
