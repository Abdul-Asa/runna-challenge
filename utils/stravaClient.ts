import type { Activity, ActivityStreams, User } from "../types/strava";

class StravaClient {
  private _accessToken: string;
  constructor() {}

  set accessToken(v: string) {
    this._accessToken = v;
  }

  async fetch<T>(url: string): Promise<T> {
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${this._accessToken}` },
    });
    return await res.json();
  }

  async getUser(): Promise<User> {
    return await this.fetch<User>("https://www.strava.com/api/v3/athlete");
  }

  async getActivities(): Promise<Activity[]> {
    return await this.fetch<Activity[]>(
      "https://www.strava.com/api/v3/athlete/activities"
    );
  }

  async getActivity(id: number): Promise<Activity & { laps: any[] }> {
    return await this.fetch<Activity & { laps: any[] }>(
      `https://www.strava.com/api/v3/activities/${id}`
    );
  }

  async getActivityStreams(activityId: number): Promise<ActivityStreams> {
    const response = await fetch(
      `https://www.strava.com/api/v3/activities/${activityId}/streams?keys=heartrate,altitude,cadence,velocity_smooth&key_by_type=true`,
      {
        headers: {
          Authorization: `Bearer ${this._accessToken}`,
        },
      }
    );
    return response.json();
  }
}

export const stravaClient = new StravaClient();
