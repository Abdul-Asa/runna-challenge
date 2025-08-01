import React, { useCallback, useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  SectionList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import * as WebBrowser from "expo-web-browser";
import {
  exchangeCodeAsync,
  makeRedirectUri,
  useAuthRequest,
} from "expo-auth-session";
import Constants from "expo-constants";
import { stravaClient } from "./utils/stravaClient";
import { Activity, User } from "./types/strava";
import ActivityCard from "./components/ActivityCard";
import { SheetProvider } from "react-native-actions-sheet";
import "./components/Sheet";

WebBrowser.maybeCompleteAuthSession();

const STRAVA_CONFIG = {
  authorizationEndpoint: "https://www.strava.com/oauth/mobile/authorize",
  tokenEndpoint: "https://www.strava.com/oauth/token",
  revocationEndpoint: "https://www.strava.com/oauth/deauthorize",
};

const STRAVA_CLIENT_ID = Constants.expoConfig?.extra?.stravaClientId;
const STRAVA_CLIENT_SECRET = Constants.expoConfig?.extra?.stravaClientSecret;
const STRAVA_REDIRECT_URI = makeRedirectUri({
  scheme: "myapp",
  preferLocalhost: true,
  path: "oauth",
});

//Consider using expo-secure-store to store the access token & refresh token

const App = () => {
  const [user, setUser] = useState<User>(null);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(false);
  const [request, response, promtAsync] = useAuthRequest(
    {
      clientId: STRAVA_CLIENT_ID,
      clientSecret: STRAVA_CLIENT_SECRET,
      scopes: ["activity:read_all,activity:write"],
      redirectUri: STRAVA_REDIRECT_URI,
    },
    STRAVA_CONFIG
  );

  const onPressStravaAuth = useCallback(async () => {
    setLoading(true);
    if (request) {
      const result = await promtAsync();
      // The template code used response?.type, which didn't work unless user signs in twice, so I changed it to result?.type
      if (result?.type === "success") {
        const { code } = result.params;
        const exchangeResponse = await exchangeCodeAsync(
          {
            clientId: STRAVA_CLIENT_ID,
            code,
            redirectUri: STRAVA_REDIRECT_URI,
            extraParams: {
              client_secret: STRAVA_CLIENT_SECRET,
            },
          },
          { tokenEndpoint: STRAVA_CONFIG.tokenEndpoint }
        );
        console.log("token", exchangeResponse);

        //Set the access token and fetch the user and activities
        stravaClient.accessToken = exchangeResponse.accessToken;

        const user = await stravaClient.getUser();
        const activities = await stravaClient.getActivities();
        setUser(user);
        setActivities(activities);
      }
    }
    setLoading(false);
  }, [request, response, promtAsync]);

  //Render strat:
  //1. Check if user is logged in
  //2. If user is logged in, fetch activities and render them
  //3. If user is not logged in, render the login button (With loading state)

  //Should implement error handling
  return (
    <SheetProvider>
      <View style={styles.container}>
        {user ? (
          <View style={styles.userContainer}>
            <Text style={styles.welcomeText}>Welcome {user.firstname}</Text>
            <SectionList
              sections={[
                {
                  title: "Activities",
                  data: activities,
                },
              ]}
              renderItem={({ item }) => <ActivityCard activity={item} />}
              renderSectionHeader={({ section }) => (
                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionTitle}>{section.title}:</Text>
                </View>
              )}
              contentContainerStyle={styles.listContainer}
            />
          </View>
        ) : (
          <View style={styles.authContainer}>
            {loading ? (
              <ActivityIndicator size="small" />
            ) : (
              <TouchableOpacity
                onPress={onPressStravaAuth}
                style={styles.authButton}
              >
                <Text style={styles.authButtonText}>Strava Auth</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      </View>
    </SheetProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
  },
  userContainer: {
    flex: 1,
    gap: 16,
    padding: 16,
  },
  welcomeText: {
    paddingTop: 40,
    fontSize: 32,
    fontWeight: "bold",
  },
  sectionHeader: {
    backgroundColor: "white",
    paddingVertical: 8,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "semibold",
  },
  listContainer: {
    paddingBottom: 24,
  },
  authContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  authButton: {
    backgroundColor: "#161616",
    borderRadius: 4,
    padding: 16,
  },
  authButtonText: {
    color: "#FFF",
  },
});

export default App;
