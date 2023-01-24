import clsx from "clsx";
import dayjs from "dayjs";
import { Dimensions, TouchableOpacity, TouchableOpacityProps} from "react-native";

import { GenerateProgressPercentage } from "../utils/GenerateProgressPercentage";

const WEEK_DAYS = 7;
const SCREEN_HORIZONTAL_PADDING = (32 * 2) / 5;

export const DAY_MARGIN_BETWEEN = 8;
export const DAY_SIZE = (Dimensions.get('screen').width / WEEK_DAYS) - SCREEN_HORIZONTAL_PADDING;

interface props extends TouchableOpacityProps{
    availableHabits?: number
    completedHabits?: number
    date: Date
};

export function HabitNode({availableHabits = 0, completedHabits = 0, date, ...rest}: props){
    
    const accomplishedPercentage = availableHabits > 0 ? GenerateProgressPercentage(availableHabits, completedHabits) : 0
    const today = dayjs().startOf('day').toDate()
    const isCurrentDay = dayjs(date).isSame(today)
    
    return(
        <TouchableOpacity
            activeOpacity={.7}
            className={clsx("rounded-lg border-2 m-1", {
                ["bg-zinc-900 border-zinc-800"] : accomplishedPercentage === 0,
                ["bg-violet-900 border-violet-700"] : accomplishedPercentage > 0 && accomplishedPercentage < 20,
                ["bg-violet-800 border-violet-600"] : accomplishedPercentage > 20 && accomplishedPercentage < 70,
                ["bg-violet-700 border-violet-500"] : accomplishedPercentage > 40 && accomplishedPercentage < 60,
                ["bg-violet-600 border-violet-500"] : accomplishedPercentage > 60 && accomplishedPercentage < 80,
                ["bg-violet-500 border-violet-400"] : accomplishedPercentage > 80,
                ["border-white border-4"] : isCurrentDay
            })}
            style={{width: DAY_SIZE, height: DAY_SIZE }}
            {...rest}
        >

        </TouchableOpacity>
    );
}