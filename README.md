# Strava Activity Tracker

A React Native mobile application that integrates with the Strava API to display detailed activity information and analytics. This app provides users with comprehensive insights into their fitness activities including heart rate, elevation, cadence, and speed data.

## Features

- **Strava OAuth Authentication**: Secure login flow using Strava credentials
- **Activity Feed**: Browse and view a list of your recent Strava activities
- **Detailed Activity Views**: Comprehensive activity information with metrics
- **Activity Streams**: Real-time data visualization for:
  - Heart rate monitoring
  - Elevation tracking
  - Cadence analysis
  - Speed metrics
- **Lap Analytics**: Detailed per-lap statistics including:
  - Maximum and minimum heart rate
  - Maximum and minimum elevation
  - Maximum cadence and speed
- **Enhanced UI**: Modal displays using react-native-actions-sheet for improved user experience
- **Error Handling**: Robust error states and loading indicators throughout the app

## Technical Stack

- **React Native** with Expo SDK 52
- **TypeScript** for type safety
- **Strava REST API** integration
- **OAuth 2.0** authentication flow
- **react-native-actions-sheet** for modal displays

## Setup and Running Guide

## Prerequisites

Before you begin, make sure you have the following tools installed on your machine:

1. **Node.js** (LTS version recommended): [Download here](https://nodejs.org/)
2. **Expo CLI**: Install globally via npm:

   ```bash
   npm install -g expo-cli
   ```

3. **Git**: You will need Git to clone the repository: [Download here](https://git-scm.com/)

### Additional Tools (Platform-Specific)

- **iOS (for macOS users only)**:

  - Xcode: Install from the Mac App Store.
  - Command Line Tools: Install via Xcode → Preferences → Locations.

- **Android**:
  - Android Studio: [Download here](https://developer.android.com/studio)
  - Set up an Android Virtual Device (AVD) in Android Studio for running the app on an emulator.

## Running the project

1. Open terminal at the project root
2. Run `npm install`
3. Run `npx expo start`
4. Press `i` to open the iOS simulator
5. OR, Press `a` to open the Anroid simulator

## Authentication

The app uses Strava's OAuth 2.0 authentication flow. When you press the "Strava auth" button in the app, it will redirect you to Strava's authorization page. After successful authentication, you'll be redirected back to the app with the necessary access tokens.

You can use your own Strava account or the provided test account for demonstration purposes. The access token will be logged to the console for debugging purposes.

## Architecture & Implementation

### API Integration

- Built with native fetch API for all Strava API communications
- Implements proper error handling and loading states
- Fetches activity lists, detailed activity data, and activity streams
- Processes complex activity stream data for visualization

### Data Processing

- Real-time computation of lap analytics from activity data
- Efficient handling of large datasets from activity streams
- Smart caching strategies to minimize API calls

### UI/UX Design

- Clean, intuitive interface focused on data readability
- Responsive design that works across different device sizes
- Native feel with proper loading states and error handling
- Modal-based detailed views for better navigation flow

## Future Enhancements

- **Data Visualization**: More sophisticated charts and graphs for metrics
- **Offline Support**: Cache previously loaded activities for offline viewing
- **Performance Optimization**: Enhanced caching layer to reduce API calls
- **Additional Metrics**: Integration with more Strava data points
- **Social Features**: Activity sharing and comparison tools

## Contributing

This project demonstrates integration with the Strava API ecosystem and showcases React Native development patterns for data-heavy mobile applications.
