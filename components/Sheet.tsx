import { SheetDefinition, registerSheet } from "react-native-actions-sheet";
import ActivityActionSheet from "./ActivityActionSheet";
import { Activity, LapData } from "../types/strava";
/**
 * A Sheet library made by one of the people I follow on Twitter
 * What better way to learn a library than to use it on a company's take home project?
 * Link: https://github.com/ammarahm-ed/react-native-actions-sheet
 */

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
