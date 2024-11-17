import type { Activity, User } from "../types/strava";

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

  async getActivity(id: number): Promise<Activity> {
    return await this.fetch<Activity>(
      `https://www.strava.com/api/v3/activities/${id}`
    );
  }
}

export default StravaClient;
