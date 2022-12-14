import {Pressable, View} from "react-native";
import {addMonths, format, subMonths} from "date-fns";
import FinanceerText from "components/FinanceerText";
import {useEffect, useState} from "react";

const MonthPicker = function ({callBack, currentDate}) {

    const [nextDate, setNextDate] = useState(addMonths(currentDate, 1))
    const [previousDate, setPreviousDate] = useState(subMonths(currentDate, 1))


    useEffect(() => {
     setNextDate(addMonths(currentDate, 1))
    }, [currentDate])

    useEffect(() => {
        setPreviousDate(subMonths(currentDate, 1))
    }, [currentDate])

    return <View className={"flex-row items-center justify-around"}>
        <Pressable onPress={() => callBack(previousDate)}>
            <FinanceerText className={"text-gray"}>{format(subMonths(currentDate, 1), 'MMMM')}</FinanceerText>
            <FinanceerText className={"text-gray text-center"}> {currentDate.getFullYear()}</FinanceerText>
        </Pressable>
        <View>
            <FinanceerText className={"font-bold "}>{format(currentDate, 'MMMM')}</FinanceerText>
            <FinanceerText className={"font-bold text-center"}> {currentDate.getFullYear()}</FinanceerText>
        </View>
        <Pressable onPress={() => callBack(nextDate)}>
            <FinanceerText className={"text-gray"}>{format(nextDate, 'MMMM')}</FinanceerText>
            <FinanceerText className={"text-gray text-center"}> {nextDate.getFullYear()}</FinanceerText>
        </Pressable>
    </View>;
};

export default MonthPicker
