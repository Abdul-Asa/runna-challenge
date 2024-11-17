import { SheetDefinition, registerSheet } from "react-native-actions-sheet";
import ActivityActionSheet from "./ActivityActionSheet";
import { Activity, LapData } from "../types/strava";

registerSheet("activity-sheet", ActivityActionSheet);

declare module "react-native-actions-sheet" {
  interface Sheets {
    "activity-sheet": SheetDefinition<{
      payload: {
        activity: Activity;
        lapData: LapData[];
        isLoading: boolean;
      };
    }>;
  }
}
