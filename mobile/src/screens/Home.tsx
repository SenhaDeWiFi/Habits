import { Text, View, ScrollView, Alert } from "react-native";
import { DAY_SIZE, HabitNode } from "../components/HabitNode";
import { Header } from "../components/Header";
import { Loading } from "../components/Loading";
import { GenerateDatesFromRange} from "../utils/GenerateDatesFromRange";
import { useNavigation } from "@react-navigation/native";

import { api } from "../lib/axios";
import { useState, useEffect } from "react";
import dayjs from "dayjs";

const weekDays = ['D','S','T','Q','Q','S','S']
const dates = GenerateDatesFromRange();
const minmumSummaryDatesSize = 18 * 5;
const amountOfDaysToFill = minmumSummaryDatesSize - dates.length

type SummaryProps = Array<{
    id: string
    date: string
    available: number
    completed: number
}>

export function Home(){

    const [loading, setloading] = useState(true)
    const [summary, setSummary] = useState<SummaryProps | null>(null)

    const { navigate } = useNavigation()

    async function fetchData() {
        try {
            setloading(true)
            const response = await api.get('/summary')
            setSummary(response.data)
        } catch (error) {
            Alert.alert('Deu xabu!')
            console.log(error)
        } finally{
            setloading(false)
        }
    }
    
    useEffect(() => {
        fetchData()
    }, [])

    if (loading) {
        return(
            <Loading></Loading>
        )
    }

    return(
        <View className="flex-1 bg-background px-4 pt-16">
            <Header />
    
            <View className="flex-row mt-6 mb-2">
                {
                    weekDays.map((weekday, i) =>(
                        <Text
                            key={`${weekday}-${i}`}
                            className = "text-zinc-400 text-xl font-bold text-center mx-1"
                            style = {{width : DAY_SIZE}}
                        >
                            {weekday}
                        </Text>
                    ))
                }

            </View>
            <ScrollView
                showsVerticalScrollIndicator = {false}
                contentContainerStyle = {{paddingBottom: 50}}>
                {
                summary &&
                <View className="flex-row flex-wrap">
                    { 
                        dates.map((date) => {
                            const daysWithStuff = summary.find(day =>{
                                return dayjs(date).isSame(day.date, 'day')
                            })

                            return(
                                <HabitNode
                                    date={date}
                                    availableHabits={daysWithStuff?.available}
                                    completedHabits={daysWithStuff?.completed} 
                                    key={`${date}`}
                                    onPress={() => navigate('habit', { date: date.toISOString() })}
                                />
                            )
                        })
                    }
                
                {
                    amountOfDaysToFill > 0 && Array.from({length: amountOfDaysToFill})
                    .map((_, index) => (
                        <View
                            key={index}
                            className="bg-zinc-900 rounded-lg border-2 m-1 border-zinc-800 opacity-40"
                            style={{width: DAY_SIZE, height: DAY_SIZE }}
                        />
                    ))
                }
                </View>
                } 
            </ScrollView>    
        </View>
    )

}