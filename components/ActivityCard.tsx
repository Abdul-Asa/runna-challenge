import { useState } from "react";
import {
  Animated,
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
} from "react-native";
import { Activity } from "../types/strava";

interface ActivityCardProps {
  activity: Activity;
}

const ActivityCard = ({ activity }: ActivityCardProps) => {
  const [expanded, setExpanded] = useState(false);
  const [animation] = useState(new Animated.Value(0));

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
    outputRange: [200, 400],
  });

  return (
    <TouchableOpacity onPress={toggleExpand} activeOpacity={0.7}>
      <Animated.View style={[styles.card, { maxHeight }]}>
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

        <Animated.View style={{ opacity: animation }}></Animated.View>
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
