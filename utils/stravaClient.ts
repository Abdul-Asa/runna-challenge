import type { Activity, ActivityStreams, User } from "../types/strava";

//Client for interacting with the Strava API
class StravaClient {
  private _accessToken: string;

  constructor() {}

  set accessToken(v: string) {
    this._accessToken = v;
  }

  async fetch<T>(url: string): Promise<T> {
    // console.log("fetching", url);
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
    return await this.fetch<ActivityStreams>(
      `https://www.strava.com/api/v3/activities/${activityId}/streams?keys=heartrate,altitude,cadence,velocity_smooth&key_by_type=true`
    );
  }
}

export const stravaClient = new StravaClient();
