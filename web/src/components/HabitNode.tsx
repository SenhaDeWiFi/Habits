import * as Popover from "@radix-ui/react-popover";
import clsx from "clsx";
import { ProgressBar } from "./ProgressBar";
interface HabitProps {
    completed: number
    available: number
}

export function HabitNode(props : HabitProps){
    const completPercen = Math.round( props.completed / props.available * 100)

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
                    <span className="font-semibold text-zinc-400">Terça Feira</span>
                    <span className="mt-1 font-bold leading-tight text-3xl">17/01</span>

                    <ProgressBar progress={completPercen}/>

                    <Popover.Arrow height={8} width={16} className="fill-zinc-900"/>
                </Popover.Content>
            </Popover.Portal>
        </Popover.Root>
    )

}