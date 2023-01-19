import './Habit.css'

interface HabitProps {
    completed: number
}

export function Habit(props : HabitProps){
    return(
        <h1 className="habit">{props.completed}</h1>
    )

}