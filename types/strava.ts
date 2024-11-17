//Tried to create types for Strava API responses
//Quite incomplete, so I decided to use any for the rest of the properties
//Swagger-typescript-api or something similar would be a good tool to generate the types based on the swagger.json or openapi.json

export interface User {
  id: number;
  firstname: string;
  lastname: string;
  [key: string]: any;
}

export interface Activity {
  id: number;
  name: string;
  distance: number;
  elapsed_time: number;
  start_date: string;
  average_speed: number;
  [key: string]: any;
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
