import { Text, View, ScrollView } from "react-native";
import { DAY_SIZE, HabitNode } from "../components/HabitNode";
import { Header } from "../components/Header";
import { GenerateDatesFromRange} from "../utils/GenerateDatesFromRange";


const weekDays = ['D','S','T','Q','Q','S','S']
const dates = GenerateDatesFromRange();
const minmumSummaryDatesSize = 18 * 5;
const amountOfDaysToFill = minmumSummaryDatesSize - dates.length

export function Home(){
    return(
        <View className="flex-1 bg-background px-8 pt-16">
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
                <View className="flex-row flex-wrap ">
                    { 
                    dates.map((date) => (
                        <HabitNode key={`${date}`}></HabitNode>
                        ))}
                
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
            </ScrollView>    
        </View>
    )

}