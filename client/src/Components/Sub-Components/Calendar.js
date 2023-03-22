import React, { useState, useImperativeHandle, useEffect } from "react";

import './Calendar.css'

const Calendar = React.forwardRef(({ onDateChange, selectedStartDate, selectedEndDate }, ref) => {
    const currentDate = new Date()
    const [currentYear, setCurrentYear] = useState(currentDate.getFullYear())
    const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth())
    const nextMonth = (currentMonth + 1) % 12
    const nextYear = currentMonth === 11 ? currentYear + 1 : currentYear

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

    const [startDate, setStartDate] = useState(selectedStartDate)
    const [endDate, setEndDate] = useState(selectedEndDate)
    const [hoverDate, setHoverDate] = useState(null)

    const handleLeftArrowClick = () => {
        if (currentMonth === currentDate.getMonth() && currentYear === currentDate.getFullYear()) {
            return
        }

        if (currentMonth > 0) {
            setCurrentMonth(currentMonth - 1);
        } else if (currentYear > currentDate.getFullYear()) {
            setCurrentMonth(11);
            setCurrentYear(currentYear - 1)
        }
    };

    const handleRightArrowClick = () => {
        if (currentMonth === currentDate.getMonth() && currentYear === currentDate.getFullYear() + 1) {
            return;
        }

        if (currentMonth < 11) {
            setCurrentMonth(currentMonth + 1);
        } else if (currentYear < currentDate.getFullYear() + 1) {
            setCurrentMonth(0);
            setCurrentYear(currentYear + 1)
        }
    };

    const clearDates = () => {
        setStartDate(null);
        setEndDate(null);
      };

      useImperativeHandle(ref, () => ({
        clearDates,
      }))

    const onDayClick = (day, month, year) => {
        const selectedDate = new Date(year, month, day)

        if (!startDate) {
            setStartDate(selectedDate)
            onDateChange(selectedDate, endDate)
        }
        else if (!endDate) {
            if (selectedDate < startDate) {
                setEndDate(startDate)
                setStartDate(selectedDate)
            }
            else if (selectedDate > startDate) {
                setEndDate(selectedDate)
            }
            else {
                setStartDate(null)
            }
            onDateChange(startDate, endDate)
        }
        else {
            if (selectedDate.getTime() === startDate.getTime()) {
                setStartDate(endDate)
                setEndDate(null)
            }
            else if (selectedDate.getTime() === endDate.getTime()) {
                setEndDate(null)
            }
            else {
                setStartDate(selectedDate)
                setEndDate(null)
            }
            onDateChange(startDate, endDate)
        }
    }

    const onDayHover = (day, month, year) => {
        setHoverDate(new Date(year, month, day))
    }

    const isInSelectedRange = (day, month, year) => {
        const date = new Date(year, month, day)
        if (!startDate || !endDate) return false

        const minDate = startDate < endDate ? startDate : endDate
        const maxDate = startDate > endDate ? startDate : endDate

        return date > minDate && date < maxDate
    }

    function generateCalendar(month, year) {
        const firstDayOfMonth = new Date(year, month, 1).getDay()
        const lastDateOfMonth = new Date(year, month + 1, 0).getDate()
        const calendar = []
        let currentDay = 1 - firstDayOfMonth

        while (currentDay <= lastDateOfMonth) {
            const week = []

            for (let i = 0; i < 7; i++) {
                if (currentDay > 0 && currentDay <= lastDateOfMonth) {
                    week.push(currentDay)
                }
                else {
                    week.push(null)
                }

                currentDay++
            }

            calendar.push(week)
        }

        return calendar
    }

    const renderCalendarTable = (monthData, month, year) => (
        <table className={"calendar"}>
        <thead>
            <tr>
                <th>Su</th>
                <th>Mo</th>
                <th>Tu</th>
                <th>We</th>
                <th>Th</th>
                <th>Fr</th>
                <th>Sa</th>
            </tr>
        </thead>
        <tbody>
            {monthData.map((week, index) => (
                <tr key={index}>
                    {week.map((day, index) => {
                        const isSelectedStart = day && startDate && startDate.getDate() === day && startDate.getMonth() === month && startDate.getFullYear() === year
                        const isSelectedEnd = day && endDate && endDate.getDate() === day && endDate.getMonth() === month && endDate.getFullYear() === year
                        const isHovered = day && hoverDate && hoverDate.getDate() === day && hoverDate.getMonth() === month && hoverDate.getFullYear() === year
                        const inRange = day && isInSelectedRange(day, month, year)
                        const cellClassName = day ? (isSelectedStart || isSelectedEnd ? 'selected' : inRange ? 'in-range' : 'day') : 'empty'
                        return (
                        <td
                            key={index}
                            className={cellClassName}
                            onMouseEnter={day ? () => onDayHover(day, month, year) : null}
                            onClick={day ? () => onDayClick(day, month, year) : null}
                        >
                            {day}
                        </td>
                        )
                    })}
                </tr>
            ))}
        </tbody>
        </table>
    )

    const leftCalendarData = generateCalendar(currentMonth, currentYear)
    const rightCalendarData = generateCalendar(nextMonth, nextYear)

    useEffect(() => {
        if (onDateChange) {
            onDateChange(startDate, endDate)
        }
    }, [startDate, endDate, onDateChange, selectedStartDate, selectedEndDate])

    return (
        <div className="calendarContainer">
            <div className="calendarMonthContainer">
                <div className="calendarLeftMonthContainer">
                    <p className="calendarLeftMonthText">{months[currentMonth] + " " + currentYear}</p>
                    <div className="calendarLeftArrowContainer">
                        <div className="calendarLeftArrowCircleContainer" onClick={handleLeftArrowClick}>
                            <i className="fa-solid fa-chevron-left calendarLeftArrow"></i>
                        </div>
                    </div>
                </div>
                <div className="calendarRightMonthContainer">
                    <p className="calendarRightMonthText">{months[(currentMonth + 1) % 12] + " " + (currentMonth === 11 ? currentYear + 1 : currentYear)}</p>
                    <div className="calendarRightArrowContainer">
                        <div className="calendarRightArrowCircleContainer" onClick={handleRightArrowClick}>
                            <i className="fa-solid fa-chevron-right calendarRightArrow"></i>
                        </div>
                    </div>
                </div>
            </div>
            <div className="calendarBodyContainer">
                <div className="calendarLeftBodyContainer">
                    {renderCalendarTable(leftCalendarData, currentMonth, currentYear)}
                </div>
                <div className="calendarRightBodyContainer">
                    {renderCalendarTable(rightCalendarData, nextMonth, currentYear)}
                </div>
            </div>
        </div>
    )
})

export default Calendar
