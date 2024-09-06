import React, { useCallback, useEffect } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import * as WebBrowser from "expo-web-browser";
import {
  exchangeCodeAsync,
  makeRedirectUri,
  useAuthRequest,
} from "expo-auth-session";

WebBrowser.maybeCompleteAuthSession();

const STRAVA_CONFIG = {
  authorizationEndpoint: "https://www.strava.com/oauth/mobile/authorize",
  tokenEndpoint: "https://www.strava.com/oauth/token",
  revocationEndpoint: "https://www.strava.com/oauth/deauthorize",
};

const STRAVA_CLIENT_ID = ""; // Add your client id here
const STRAVA_CLIENT_SECRET = ""; // Add your client secret here;
const STRAVA_REDIRECT_URI = makeRedirectUri({
  scheme: "myapp",
  preferLocalhost: true,
  path: "oauth",
});

const App = () => {
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
    if (request) {
      await promtAsync();
      if (response?.type === "success") {
        const { code } = response.params;
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
      }
    }
  }, [request, response, promtAsync]);

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={{ padding: 16, flex: 1 }}
      contentContainerStyle={{ flex: 1 }}
    >
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
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
      </View>
    </ScrollView>
  );
};

export default App;
