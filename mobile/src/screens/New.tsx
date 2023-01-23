import { useState } from "react";
import { View, ScrollView, Text, TextInput, TouchableOpacity } from "react-native";

import { BackButton } from "../components/BackButton";
import { CheckBox } from "../components/CheckBox";
import { Feather } from "@expo/vector-icons";

import colors from 'tailwindcss/colors'

const availableWeekDays = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];

export function New(){

    const [weekDays, setWeekDays] = useState<number[]>([])

    function handleToggleDayCheck(weekDayIndex: number){
        if (weekDays.includes(weekDayIndex)) {
            setWeekDays(prevState => prevState.filter(weekDay => weekDay !== weekDayIndex))
        } else{
            setWeekDays(prevState => [...prevState, weekDayIndex]);
        }
    }

    return(
        <View className="flex-1 bg-background px-8 pt-16">
            <ScrollView 
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom:100}}>

                <BackButton />

                <Text className="mt-6 text-white font-extrabold text-3xl">
                    Criar hábito
                </Text>

                <Text className="mt-6 text-white font-semibold text-base">
                    O que quer começar a fazer?
                </Text>

                <TextInput 
                    className="h-12 pl-4 rounded-lg mt-3 bg-zinc-900 border-2 border-zinc-800 text-white focus:border-2 focus:border-green-600"
                    placeholder="ex.: Tomar mais água, se exercitar..."
                    placeholderTextColor={colors.zinc[400]}
                />

                <Text className="mt-4 mb-3 text-white font-semibold text-base">
                    Em quais dias?
                </Text>

                {
                    availableWeekDays.map((weekday, i) => (
                        <CheckBox
                            key={i}
                            title={weekday}
                            checked={weekDays.includes(i)}
                            onPress={() => handleToggleDayCheck(i)}
                        />
                    ))
                }

                <TouchableOpacity
                    activeOpacity={.7}
                    className= "w-full h-14 flex-row items-center justify-center bg-green-600 rounded-md mt-6"
                >
                    <Feather
                        name="check"
                        size={20}
                        color={colors.white}
                    >
                        <Text className="font-semibold text-base text-white ml-2">
                            Confirmar
                        </Text>

                    </Feather>
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
}