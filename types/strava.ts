export interface User {
  id: number;
  firstname: string;
  lastname: string;
  [key: string]: unknown;
}

export interface Activity {
  id: number;
  name: string;
  distance: number;
  elapsed_time: number;
  start_date: string;
  average_speed: number;
  [key: string]: unknown;
}

export interface ActivityStreams {
  [key: string]: {
    data: number[];
    series_type: string;
    original_size: number;
    resolution: string;
  };
}

export interface LapData {
  id: number;
  name: string;
  maxCadence: number;
  maxElevation: number;
  minElevation: number;
  maxHeartRate: number;
  minHeartRate: number;
  maxSpeed: number;
}
