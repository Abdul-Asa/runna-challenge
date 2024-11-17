import React, { useCallback, useState } from "react";
import {
  ActivityIndicator,
  SafeAreaView,
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
import { stravaClient } from "./utils/stravaClient";
import { Activity, User } from "./types/strava";
import ActivityCard from "./components/ActivityCard";

WebBrowser.maybeCompleteAuthSession();

const STRAVA_CONFIG = {
  authorizationEndpoint: "https://www.strava.com/oauth/mobile/authorize",
  tokenEndpoint: "https://www.strava.com/oauth/token",
  revocationEndpoint: "https://www.strava.com/oauth/deauthorize",
};

const STRAVA_CLIENT_ID = "3119"; // Add your client id here
const STRAVA_CLIENT_SECRET = "ebe76760b27637e2f72da2b54f63894289e6dbcb"; // Add your client secret here;
const STRAVA_REDIRECT_URI = makeRedirectUri({
  scheme: "myapp",
  preferLocalhost: true,
  path: "oauth",
});

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
        stravaClient.accessToken = exchangeResponse.accessToken;

        const user = await stravaClient.getUser();
        const activities = await stravaClient.getActivities();
        setUser(user);
        setActivities(activities);
      }
    }
    setLoading(false);
  }, [request, response, promtAsync]);

  return (
    <View style={{ padding: 16, flex: 1 }}>
      {user ? (
        <View style={{ flex: 1, gap: 16, padding: 16 }}>
          <Text
            style={{
              paddingTop: 40,
              fontSize: 32,
              fontWeight: "bold",
            }}
          >
            Welcome {user.firstname}
          </Text>
          <SectionList
            sections={[
              {
                title: "Activities",
                data: activities,
              },
            ]}
            renderItem={({ item }) => <ActivityCard activity={item} />}
            renderSectionHeader={({ section }) => (
              <View style={{ backgroundColor: "white", paddingVertical: 8 }}>
                <Text style={{ fontSize: 24, fontWeight: "semibold" }}>
                  {section.title}:
                </Text>
              </View>
            )}
            contentContainerStyle={{ paddingBottom: 24 }}
          />
        </View>
      ) : (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          {loading ? (
            <ActivityIndicator size="small" />
          ) : (
            <TouchableOpacity
              onPress={onPressStravaAuth}
              style={{
                backgroundColor: "#161616",
                borderRadius: 4,
                padding: 16,
              }}
            >
              <Text style={{ color: "#FFF" }}>Strava Auth</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
};

export default App;
