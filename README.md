# Runna Strava Challenge

## Challenge

You are working for a early stage fitness startup. They want to experiment with the Strava API to see what type of information they can display in a React-Native mobile app. You have been brought in as a Full Stack engineer and your first task is to research the Strava API docs and integrate with a RN app. The tech lead has created a bare bones repo to help you get started and has also installed https://docs.expo.dev/versions/latest/sdk/auth-session/ which will handle to oAuth2.0 authetication flow with Strava.

They have also left intructions on how to get the project working on your local environment

## Setup and Running Guide

The following steps will help you get the project set up and running on your local machine.

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

### Strava API

Press `Strava auth` button on the simulator and it will take you through the Strava auth flow. Please use the following user login details (we have created a test users that has some test activities for you. This will save you from having to generate activities - also feel free to user your own strava account!):

```
email: "developer+strava@runna.com"
password: "nGE#rUlwK6mI3Z9*"
```

Your accessToken will be printed to the console (which can be seen in your terminal on tab where you started your expo project, i.e `npx expo start`). You will use this accessToken to call the Strava API

<img height="400" alt="image" src="https://user-images.githubusercontent.com/5293650/199756290-3ca777b8-bc24-4088-a3c7-6d0bf3c2e254.png">

## Tasks

1. Fetch a list of activities using the Strava API and display on the homescreen of the app (you can decide what summary information you want to display i.e. distance, time)
2. Allow a user to click on an activity in the list and display more information about the activity.
3. Use the Activity Streams API to fetch the `heartRate, elevation(altitude), cadence, speed(velocity_smooth)` for an activity (HINT: the query parameters will be something like `?keys=heartrate,altitude,velocity_smooth&key_by_type=true`)
4. Using the `laps` array from an activity we want to compute the following data points for each lap:
   - maxCadence
   - maxElevation
   - minElevation
   - maxHeartRate
   - minHeartRate
   - maxSpeed
5. Display a list of laps with above data points for each activity

## Keep in mind

- Use the native fetch API (https://reactnative.dev/docs/network) to make the Strava API requests, there is no need to install another library to do this
- Please dont spend more than 3 hours on this challenge
- There are no designs to work to. We're more concerned with functionality at this stage. You will have to make some UI / layout choices.
- If you have questions feel free to ask them.
- There is no need to push your changes up to the remote branch, the first part of the technical interview will be a code review of your changes on your local machine

Have fun. We look forward to seeing your work!
