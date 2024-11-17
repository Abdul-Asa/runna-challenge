export interface User {
  id: number;
  firstname: string;
  lastname: string;
  [key: string]: unknown;
}

export interface Activity {
  id: number;
  name: string;
  type: string;
  distance: number;
  moving_time: number;
  elapsed_time: number;
  total_elevation_gain: number;
  start_date: string;
  average_speed: number;
  max_speed: number;
  average_heartrate?: number;
  max_heartrate?: number;
  average_cadence?: number;
  description?: string | null;
  calories?: number;
  laps?: any[];
  [key: string]: unknown;
}
