import { GenerateDatesFromRange } from "../utils/GenerateDatesFromRange"
import { HabitNode } from "./HabitNode"
import { useEffect, useState } from "react";
import { api } from "../lib/axios";
import dayjs from "dayjs";

const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']

let summaryDays = GenerateDatesFromRange()
let numberOfPlaceHolders = 18 * 7 - summaryDays.length

type Summary = Array<{
    id : string;
    date: string;
    available: number;
    completed: number;
}>

export function SummaryTable(){
    const [summary, setSummary] = useState<Summary>([]) 

    useEffect(() => {
        api.get('summary').then(response => {
            setSummary(response.data)
        })
    }, [])

    return(
        <div className="w-full flex">
            <div className="grid grid-rows-7 grid-flow-row gap-3">  
                {weekDays.map( (weekDay, i) => {
                    return(
                        <div 
                            key={`${weekDay}-${i}`} 
                            className="font-bold text-zinc-400 text-xl h-10 w-10 flex items-center justify-center"
                        >
                            {weekDay}
                        </div>
                    )
                })}
            </div>
            <div className="grid grid-rows-7 grid-flow-col gap-3">
                {summaryDays.map(date =>{
                    const dayInSummary = summary.find(day => {
                        return dayjs(date).isSame(day.date, 'day')
                    })

                    return (
                      <HabitNode 
                        date={date}
                        completed={dayInSummary?.completed} 
                        available={dayInSummary?.available} 
                        key={date.toString()}
                    />)  
                })}

                {numberOfPlaceHolders > 0 && Array.from({length: numberOfPlaceHolders}).map((_, i) =>{
                    return(
                        <div key={i} className="w-10 h-10 bg-zinc-900 border-2 border-zinc-800 rounded-lg opacity-30"></div>
                    )
                })}
            </div>
        </div>
    )

}