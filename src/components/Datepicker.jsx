import dayjs from "dayjs";
import { useCallback, useMemo, useState, useRef, useEffect } from "react";
import PropTypes from 'prop-types'
import styles from '../css/datepicker.module.css'
import { GrCaretPrevious, GrCaretNext } from "react-icons/gr";
import weekday from 'dayjs/plugin/weekday'
import 'dayjs/locale/fr'
dayjs.extend(weekday)
dayjs.locale('fr')


function Datepicker({ selectedDate, setSelectedDate, isOpen, setIsOpen }) {
    const [date, setDate] = useState(selectedDate)
    const ref = useRef(null)

    const getCalendarCells = useCallback(date => {
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
    }, [])

    const cells = useMemo(() => getCalendarCells(date), [date, getCalendarCells])

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                setIsOpen(state => !state)
            }
        }
        document.addEventListener('click', handleClickOutside)
        return () => {
            document.removeEventListener('click', handleClickOutside)
        }
    }, [setIsOpen, ref])

    return (
        <>
            {
                isOpen ? <div className={styles.calendar} ref={ref}>
                    <div className={styles.calendar_header}>
                        <GrCaretPrevious onClick={() => setDate(date.clone().subtract(1, "month"))} />
                        {date.format("MMM YYYY")}
                        <GrCaretNext onClick={() => setDate(date.clone().add(1, "month"))} />
                    </div>

                    <div>Lundi</div>
                    <div>Mardi</div>
                    <div>Mercredi</div>
                    <div>Jeudi</div>
                    <div>Vendredi</div>
                    <div>Samedi</div>
                    <div>Dimanche</div>

                    {
                        cells.map((cell, cellIndex) => (

                            <div className={styles.cell} key={cellIndex} onClick={() => setSelectedDate(cell.value)}>{cell.text}</div>
                        ))
                    }
                </div> : null
            }
        </>
    );
}

Datepicker.propTypes = {
    selectedDate: PropTypes.object,
    setSelectedDate: PropTypes.func,
    isOpen: PropTypes.bool,
    setIsOpen: PropTypes.func,
}
export default Datepicker;