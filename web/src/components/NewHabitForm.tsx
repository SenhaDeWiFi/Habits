import { Check } from "phosphor-react";
import { FormEvent, useState} from "react";
import * as CheckBox from "@radix-ui/react-checkbox";
import { api } from "../lib/axios";

const availableWeekDays = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']

export function NewHabitForm(){
    
    const [title, setTitle] = useState('')
    const [weekDays, setWeekDays] = useState<number[]>([])

    async function createNewHabit(event :  FormEvent){
        event.preventDefault()
        
        if (!title || availableWeekDays.length == 0) {
            return
        }

        await api.post('habits', {
            title,
            weekDays
        })

        setTitle('')
        setWeekDays([])
    }

    function handleToggleWeekDay(weekDay : number){
        if (weekDays.includes(weekDay)){
            const newWeekDays = weekDays.filter(day => day !== weekDay)

            setWeekDays(newWeekDays)
        }else{
            const newWeekDays = [...weekDays, weekDay]

            setWeekDays(newWeekDays)
        }
    }

    return(
        <form onSubmit={createNewHabit} className="w-full flex flex-col mt-6">
            <label htmlFor="title" className="font-semibold leading-tight">
                O que quer começar a fazer?
            </label>

            <input 
                type="text"
                id="title"
                placeholder="ex.: Tomar mais água, se exercitar..."
                className="p-4 rounded-lg mt-3 bg-zinc-800 text-white placeholder:text-zinc-400"
                autoFocus
                value={title}
                onChange={event => setTitle(event.target.value)}
            >
            </input>

            <label htmlFor="" className="font-semibold leading-tight mt-4">
                Em quais dias?
            </label>

            <div className="flex flex-col gap-2 mt-3"> 
               {availableWeekDays.map((weekDay, i) => (
                    
                    <CheckBox.Root
                        className="flex items-center gap-3 group"
                        key={weekDay}
                        onCheckedChange={() => (handleToggleWeekDay(i))}
                        checked = {weekDays.includes(i)}
                    >
                        <div className="h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500">
                            <CheckBox.CheckboxIndicator>
                                <Check size={20} className="text-white"></Check>
                            </CheckBox.CheckboxIndicator>
                        </div>

                        <span className="text-white leading-tight font-semibold">
                            {weekDay} 
                        </span>
                    </CheckBox.Root>
               ))}
            </div>

            <button type="submit" className="mt-6 rounded-lg p-4 flex items-center justify-center gap-3 font-semibold bg-green-600 hover:bg-green-500">
                <Check size={20} weight="bold"/>
                    Confirmar
            </button>

        </form>
    )
}