import dayjs from "dayjs";
import { useEffect } from "react";
import weekday from 'dayjs/plugin/weekday'
import 'dayjs/locale/fr'
dayjs.extend(weekday)
dayjs.locale('fr')


function Datepicker() {



    useEffect(() => {

        const date = dayjs().set('month', 0)

        const daysToFirstOfTheMonth = date.date(1).weekday() - 1
        console.log('index of first', date.date(1).weekday())
        console.log(dayjs.locale())
        console.log("🚀 ~ file: Datepicker.jsx:9 ~ useEffect ~ daysToFirstOfTheMonth:", daysToFirstOfTheMonth)
        const calendarCells = []
        const daysInMonth = date.daysInMonth()
        // push current month day cells
        for (let i = 0; i < daysInMonth; i++) {
            calendarCells.push(i + 1);
        }
        const cellsToAdd = 42 - daysInMonth - (daysToFirstOfTheMonth + 1)
        console.log("🚀 ~ file: Datepicker.jsx:20 ~ useEffect ~ cellsToAdd:", cellsToAdd)


        // Ici je voudrais récuperer le nombre de jours qu'il y a entre le premier jour du mois et le lundi qui le précede
        // Puis faire pareil pour le dernier jour, car il pourrait être un dimanche
        // add to start from prev month
        const lastMonth = date.subtract(1, "month");
        for (let i = 0; i <= daysToFirstOfTheMonth; i++) {
            calendarCells.unshift(lastMonth.daysInMonth() - i);
        }

        // add to end from next month
        for (let i = 0; i < cellsToAdd; i++) {
            calendarCells.push(i + 1);
        }
        //const dateClone = date.clone().set('date', 12)
        console.log(calendarCells)
    })

    return (<>
    </>);
}

export default Datepicker;