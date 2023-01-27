import { TouchableOpacity, Dimensions, TouchableOpacityProps } from "react-native";
import { generateProgressPercentage } from "../utils/generate-progress-percentage";
import clsx from 'clsx';
import dayjs from 'dayjs';

const WEEK_DAYS = 7;
const SCREEN_HORIZONTAL_PADDING = ( 32 * 2 ) / 5;

export const DAY_MARGIN_BETWEEN = 8;
export const DAY_SIZE = (Dimensions.get('screen').width / WEEK_DAYS) - (SCREEN_HORIZONTAL_PADDING + 5);

interface Props extends TouchableOpacityProps {
    amountOfHabits?: number;
    amountCompleted?: number;
    date: Date;
};

export function HabitDay({amountOfHabits = 0, amountCompleted = 0, date, ...rest}: Props) {

    const amountAcomplishedPercentage = amountOfHabits > 0 ? generateProgressPercentage(amountOfHabits, amountCompleted): 0;
    const today = dayjs().startOf('day').toDate();
    const isCurrentDay = dayjs(date).isSame(today);

    return (
        <TouchableOpacity
        className={clsx("rounded-lg border-2 m-1", {
            ["bg-zinc-900 border-zinc-800"] : amountAcomplishedPercentage === 0,
            ["bg-violet-900 border-purple-700"] : amountAcomplishedPercentage > 0 && amountAcomplishedPercentage < 20,
            ["bg-violet-800 border-purple-600"] : amountAcomplishedPercentage >= 20 && amountAcomplishedPercentage < 40,
            ["bg-violet-700 border-purple-500"] : amountAcomplishedPercentage >= 40 && amountAcomplishedPercentage < 60,
            ["bg-violet-600 border-purple-500"] : amountAcomplishedPercentage >= 60 && amountAcomplishedPercentage < 80,
            ["bg-violet-500 border-purple-400"] : amountAcomplishedPercentage >= 80,
            ["border-3 border-zinc-200"] : isCurrentDay,
        })}
        style={{width: DAY_SIZE, height: DAY_SIZE}}
        activeOpacity={0.7}
        {...rest}
        />
    )
}