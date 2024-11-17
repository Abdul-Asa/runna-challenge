import { useEffect, useState } from "react";
import {
  Animated,
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  ActivityIndicator,
  SectionList,
} from "react-native";
import { Activity, ActivityStreams, LapData } from "../types/strava";
import { stravaClient } from "../utils/stravaClient";
interface ActivityCardProps {
  activity: Activity;
}

const ActivityCard = ({ activity }: ActivityCardProps) => {
  const [expanded, setExpanded] = useState(false);
  const [animation] = useState(new Animated.Value(0));
  const [loading, setLoading] = useState(false);
  const [lapData, setLapData] = useState<LapData[]>([]);
  const [contentHeight, setContentHeight] = useState(100);

  const toggleExpand = () => {
    const toValue = expanded ? 0 : 1;
    Animated.spring(animation, {
      toValue,
      useNativeDriver: false,
    }).start();
    setExpanded(!expanded);
  };

  const maxHeight = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [200, contentHeight],
  });

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

  useEffect(() => {
    if (lapData.length === 0) {
      setLoading(true);
      fetchLapInfo().finally(() => setLoading(false));
    }
  }, [activity]);

  return (
    <TouchableOpacity onPress={toggleExpand} activeOpacity={0.7}>
      <Animated.View
        style={[styles.card, { maxHeight }]}
        onLayout={({ nativeEvent }) => {
          if (nativeEvent.layout.height > 100) {
            setContentHeight(nativeEvent.layout.height);
          }
        }}
      >
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

        <Animated.View style={{ opacity: animation }}>
          {loading && <ActivityIndicator size="large" color="#161616" />}
          {!loading && lapData && (
            <SectionList
              sections={[{ title: "Laps", data: lapData }]}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => <Text>{item.name}</Text>}
            />
          )}
        </Animated.View>
      </Animated.View>
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
