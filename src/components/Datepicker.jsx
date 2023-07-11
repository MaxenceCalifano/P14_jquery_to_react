import dayjs from "dayjs";
import { useCallback, useMemo } from "react";
import PropTypes from 'prop-types'
import { GrCaretPrevious, GrCaretNext } from "react-icons/gr";
import weekday from 'dayjs/plugin/weekday'
import 'dayjs/locale/fr'
dayjs.extend(weekday)
dayjs.locale('fr')


function Datepicker({ selectedDate, setSelectedDate }) {
    //simule la props
    //const date = dayjs().set('month', 0)// .set('date', 4) peu se chainer comme ça

    const getCalendarCells = date => {
        const daysToFirstOfTheMonth = date.date(1).weekday() - 1

        const calendarCells = []
        const daysInMonth = date.daysInMonth()

        const prepareCell = (date, dayNumber) => {
            return {
                text: String(dayNumber),
                value: date.clone().set("date", dayNumber)
            };
        };

        // push current month day cells
        for (let i = 0; i < daysInMonth; i++) {
            calendarCells.push(prepareCell(date, i + 1));
        }
        const cellsToAdd = 42 - daysInMonth - (daysToFirstOfTheMonth + 1)

        // Gets the number of days between the first day of the month and the monday of the same week, same for the last day
        // add to start from prev month
        const lastMonth = date.subtract(1, "month");
        for (let i = 0; i <= daysToFirstOfTheMonth; i++) {
            calendarCells.unshift(prepareCell(lastMonth, lastMonth.daysInMonth() - i));
        }

        // add to end from next month
        const nextMonth = date.add(1, "month");
        for (let i = 0; i < cellsToAdd; i++) {
            calendarCells.push(prepareCell(nextMonth, i + 1));
        }
        //const dateClone = date.clone().set('date', 12)
        return calendarCells
    }

    const getCalendarRows = useCallback(() => {
        const cells = getCalendarCells(selectedDate)

        const rows = [];

        // split one array into chunks
        for (let i = 0; i < cells.length; i += 7) {
            rows.push(cells.slice(i, i + 7));
        }
        console.log("🚀 ~ file: Datepicker.jsx:46 ~ getCalendarRows ~ rows:", rows)

        return rows;
    }, [selectedDate])

    const rows = useMemo(() => getCalendarRows(selectedDate), [selectedDate, getCalendarRows])

    return (
        <table>
            <thead>
                <tr>
                    <th colSpan={7}>
                        <div>
                            <GrCaretPrevious />
                            {selectedDate.format("MMM YYYY")}
                            <GrCaretNext />
                        </div>
                    </th>
                </tr>

            </thead>
            <tbody>
                <tr>
                    <th>Lundi</th>
                    <th>Mardi</th>
                    <th>Mercredi</th>
                    <th>Jeudi</th>
                    <th>Vendredi</th>
                    <th>Samedi</th>
                    <th>Dimanche</th>
                </tr>
                {
                    rows.map((cells, rowIndex) => (
                        <tr key={rowIndex}>
                            {cells.map(({ text, value }, cellIndex) => (
                                <td key={cellIndex} onClick={() => console.log(value)}>{text}</td>
                            ))}
                        </tr>
                    ))
                }
            </tbody>

        </table>
    );
}

Datepicker.propTypes = {
    selectedDate: PropTypes.object,
    setSelectedDate: PropTypes.func
}
export default Datepicker;