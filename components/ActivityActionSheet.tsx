import ActionSheet, { SheetProps, FlatList } from "react-native-actions-sheet";
import { LapData } from "../types/strava";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import React from "react";

function ActivityActionSheet({ payload }: SheetProps<"activity-sheet">) {
  const { isLoading, activity, lapData } = payload;

  const renderLapItem = ({ item, index }: { item: LapData; index: number }) => (
    <View style={styles.lapCard}>
      <Text style={styles.lapTitle}>Lap {index + 1}</Text>
      <Text style={styles.lapInfo}>
        Max Speed: {item.maxSpeed.toFixed(2)} km/h
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
    <ActionSheet containerStyle={styles.container} gestureEnabled>
      {isLoading ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          ListHeaderComponent={() => (
            <>
              <Text style={styles.title}>{activity.name}</Text>
              <Text style={styles.infoText}>Activity Info</Text>
              <View style={styles.infoContainer}>
                <Text style={styles.infoText}>
                  {/* UI tip:Don't know what data to show? Just show the whole JSON, your users will love you for it /s 😃👍🏾 */}
                  {JSON.stringify(
                    {
                      ...activity,
                      //I dont want to show the map from the activity object
                      //as it contains a summaryPolyline property that is a large string
                      map: null,
                    },
                    null,
                    2
                  )}
                </Text>
              </View>
              <Text style={styles.infoText}>Laps</Text>
            </>
          )}
          data={lapData}
          renderItem={renderLapItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </ActionSheet>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "80%",
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
  infoContainer: {
    padding: 16,
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    marginBottom: 12,
  },
  infoText: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
});

export default ActivityActionSheet;
