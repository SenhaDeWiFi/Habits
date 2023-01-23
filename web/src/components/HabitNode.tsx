import * as Popover from "@radix-ui/react-popover";
import * as CheckBox from "@radix-ui/react-checkbox";
import clsx from "clsx";
import { ProgressBar } from "./ProgressBar";
import { Check } from "phosphor-react";
import dayjs from "dayjs";
interface HabitProps {
    date: Date
    completed?: number
    available?: number
}

export function HabitNode({completed = 0, available = 0, date} : HabitProps){
    const completPercen = available > 0 ? Math.round(completed / available * 100) : 0

    const dayAndMonth = dayjs(date).format('DD/MM')
    const weekDay = dayjs(date).format('dddd')


    return(
        <Popover.Root>
            <Popover.Trigger 
                className={clsx('w-10 h-10 rounded-lg border-2', {
                    'bg-violet-500 border-violet-400' : completPercen >= 80,
                    'bg-violet-600 border-violet-500' : completPercen >= 60 && completPercen <80,
                    'bg-violet-700 border-violet-600' : completPercen >= 40 && completPercen <60,
                    'bg-violet-800 border-violet-700' : completPercen >= 20 && completPercen <40,
                    'bg-violet-900 border-violet-800' : completPercen > 0 && completPercen <20,
                    'bg-zinc-900 border-zinc-800' : completPercen == 0
                })}
            />
            
            <Popover.Portal>
                <Popover.Content className="min-w-[320px] p-6 rounded-2xl bg-zinc-900 flex flex-col">
                    <span className="font-semibold text-zinc-400">{weekDay}</span>
                    <span className="mt-1 font-bold leading-tight text-3xl">{dayAndMonth}</span>

                    <ProgressBar progress={completPercen}/>

                    <div className="mt-6 flex flex-col gap-3">
                        <CheckBox.Root
                            className="flex items-center gap-3 group">

                            <div 
                                className="h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500">
                                
                                <CheckBox.CheckboxIndicator>
                                    <Check size={20} className="text-white"></Check>
                                </CheckBox.CheckboxIndicator>
                            </div>

                            <span className="font-semibold text-xl text-white leading-tight group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-400"> Sexooo </span>
                        </CheckBox.Root>
                    </div>

                    <Popover.Arrow height={8} width={16} className="fill-zinc-900"/>
                </Popover.Content>
            </Popover.Portal>
        </Popover.Root>
    )

}