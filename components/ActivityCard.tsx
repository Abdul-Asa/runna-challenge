import { useEffect, useState } from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import { Activity, LapData } from "../types/strava";
import { stravaClient } from "../utils/stravaClient";
import { SheetManager } from "react-native-actions-sheet";

interface ActivityCardProps {
  activity: Activity;
}

const ActivityCard = ({ activity }: ActivityCardProps) => {
  const [loading, setLoading] = useState(false);
  const [lapData, setLapData] = useState<LapData[]>([]);

  const fetchLapInfo = async () => {
    const activityData = await stravaClient.getActivity(activity.id);
    const laps = activityData.laps;
    const streams = await stravaClient.getActivityStreams(activity.id);

    const lapData = laps.map((lap) => {
      const speedData = streams.velocity_smooth.data.slice(
        lap.start_index,
        lap.end_index + 1
      );
      const heartRateData = streams.heartrate?.data.slice(
        lap.start_index,
        lap.end_index + 1
      );
      const cadenceData = streams.cadence?.data.slice(
        lap.start_index,
        lap.end_index + 1
      );
      const elevationData = streams.altitude?.data.slice(
        lap.start_index,
        lap.end_index + 1
      );

      return {
        id: lap.id,
        name: lap.name,
        maxSpeed: Math.max(...speedData) * 3.6,
        maxHeartRate: heartRateData ? Math.max(...heartRateData) : 0,
        minHeartRate: heartRateData ? Math.min(...heartRateData) : 0,
        maxCadence: cadenceData ? Math.max(...cadenceData) : 0,
        maxElevation: elevationData ? Math.max(...elevationData) : 0,
        minElevation: elevationData ? Math.min(...elevationData) : 0,
      };
    });

    setLapData(lapData);
  };

  const openSheet = () => {
    SheetManager.show("activity-sheet", {
      payload: { activity, lapData, isLoading: loading },
    });
  };

  useEffect(() => {
    if (lapData.length === 0) {
      setLoading(true);
      fetchLapInfo().finally(() => setLoading(false));
    }
  }, [activity]);

  return (
    <TouchableOpacity style={styles.card} onPress={openSheet}>
      <Text style={styles.title}>{activity.name}</Text>
      <View>
        <Text style={styles.basicInfo}>
          Distance: {(activity.distance / 1000).toFixed(2)} km
        </Text>
        <Text style={styles.basicInfo}>
          Duration: {Math.floor(activity.elapsed_time / 60)} minutes
        </Text>
        <Text style={styles.basicInfo}>
          Speed: {(activity.average_speed * 3.6).toFixed(2)} km/h
        </Text>
        <Text style={styles.basicInfo}>
          Date: {new Date(activity.start_date).toLocaleDateString()}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: "#161616",
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    elevation: 5,
    overflow: "hidden",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  basicInfo: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
});

export default ActivityCard;
