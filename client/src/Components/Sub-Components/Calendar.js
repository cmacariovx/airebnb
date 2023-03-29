import React, { useState, useImperativeHandle, useEffect } from "react";

import './Calendar.css'

const Calendar = React.forwardRef(({ onDateChange, selectedStartDate, selectedEndDate, bookings, single }, ref) => {
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
        setStartDate(null)
        setEndDate(null)
    }

    useImperativeHandle(ref, () => ({
        clearDates,
    }))

    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const onDayClick = (day, month, year) => {
        const selectedDate = new Date(year, month, day)

        if (isInDisabledRange(day, month, year)) {
            return;
        }

        if (!startDate) {
            setStartDate(selectedDate);
            onDateChange(selectedDate, endDate, calculateDaysBetween(selectedDate, endDate))
        }
        else if (!endDate) {
            const diffDays = calculateDaysBetween(startDate, selectedDate)
            if (diffDays <= 7) {
                setEndDate(selectedDate)
                onDateChange(startDate, selectedDate, diffDays)
            }
        }
        else {
            const diffDays = calculateDaysBetween(selectedDate, endDate)
            if (diffDays <= 7) {
                setStartDate(selectedDate)
                onDateChange(selectedDate, endDate, diffDays)
            }
            else {
                const allowedStartDate = new Date(endDate.getTime() - 6 * 24 * 60 * 60 * 1000)
                if (selectedDate >= allowedStartDate) {
                    setStartDate(selectedDate)
                    onDateChange(selectedDate, endDate, calculateDaysBetween(selectedDate, endDate))
                }
            }

            if (selectedDate.getTime() === endDate.getTime()) {
                setEndDate(null)
                onDateChange(startDate, null, 0)
            }
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

    const isInDisabledRange = (day, month, year) => {
        const date = new Date(year, month, day);

        if (isDateBooked(date, bookings)) {
            return true;
        }

        if (!startDate) return false;

        const maxEndDate = new Date(startDate.getTime() + 6 * 24 * 60 * 60 * 1000);
        const minStartDate = new Date(startDate.getTime() - 6 * 24 * 60 * 60 * 1000);

        if (!endDate) {
            if (date > maxEndDate || date < minStartDate) {
                return true;
            }

            let currentDate = new Date(startDate);
            while (currentDate < date) {
                currentDate.setDate(currentDate.getDate() + 1);
                if (isDateBooked(currentDate, bookings)) {
                    return true;
                }
            }
            return false;
        } else {
            const minDate = startDate < endDate ? startDate : endDate;
            const maxDate = startDate > endDate ? startDate : endDate;
            const maxAllowedDate = new Date(minDate.getTime() + 6 * 24 * 60 * 60 * 1000);
            const minAllowedDate = new Date(maxDate.getTime() - 6 * 24 * 60 * 60 * 1000);

            return date > maxAllowedDate || date < minAllowedDate;
        }
    }

    const isDateBooked = (date) => {
        if (bookings && bookings.length > 0) {
            for (const booking of bookings) {
                const bookedStartDate = new Date(booking.startDate);
                const bookedEndDate = new Date(booking.endDate);
                if (date >= bookedStartDate && date <= bookedEndDate) {
                    return true
                }
            }
        }
        return false
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
                        const isDisabled = (day && new Date(year, month, day) <= today) || isInDisabledRange(day, month, year)
                        const cellClassName = day
                        ? isSelectedStart || isSelectedEnd
                            ? "selected"
                            : inRange
                            ? "in-range"
                            : isDisabled
                            ? "disabled"
                            : "day"
                        : "empty"
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

    function calculateDaysBetween(start, end) {
        if (!start || !end) {
            return 0
        }

        const oneDay = 24 * 60 * 60 * 1000;
        const diffDays = Math.round(Math.abs((start - end) / oneDay)) + 1

        return diffDays
    }

    const leftCalendarData = generateCalendar(currentMonth, currentYear)
    const rightCalendarData = generateCalendar(nextMonth, nextYear)

    useEffect(() => {
        if (onDateChange) {
            const days = calculateDaysBetween(startDate, endDate)
            onDateChange(startDate, endDate, days)
        }
    }, [startDate, endDate, onDateChange, selectedStartDate, selectedEndDate])

    return (
        <div className={"calendarContainer"}>
            <div className={`calendarMonthContainer ${single ? "single" : "double"}`}>
                <div className={`calendarLeftMonthContainer ${single ? "single" : "double"}`}>
                    <div className={`calendarLeftArrowContainer ${single ? "single" : "double"}`}>
                        <div className="calendarLeftArrowCircleContainer" onClick={handleLeftArrowClick}>
                            <i className="fa-solid fa-chevron-left calendarLeftArrow"></i>
                        </div>
                    </div>
                    <p className="calendarLeftMonthText">{months[currentMonth] + " " + currentYear}</p>
                    {single && <div className="calendarRightArrowContainer2">
                        <div className="calendarRightArrowCircleContainer2" onClick={handleRightArrowClick}>
                                <i className="fa-solid fa-chevron-right calendarRightArrow2"></i>
                        </div>
                    </div>}
                </div>
                {!single && (
                    <div className="calendarRightMonthContainer">
                        <p className="calendarRightMonthText">{months[(currentMonth + 1) % 12] + " " + (currentMonth === 11 ? currentYear + 1 : currentYear)}</p>
                        <div className="calendarRightArrowContainer">
                            <div className="calendarRightArrowCircleContainer" onClick={handleRightArrowClick}>
                                <i className="fa-solid fa-chevron-right calendarRightArrow"></i>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <div className="calendarBodyContainer">
                <div className={`calendarLeftBodyContainer ${single ? "single" : "double"}`}>
                    {renderCalendarTable(leftCalendarData, currentMonth, currentYear)}
                </div>
                {!single && (
                    <div className="calendarRightBodyContainer">
                        {renderCalendarTable(rightCalendarData, nextMonth, nextYear)}
                    </div>
                )}
            </div>
        </div>
    )
})

export default Calendar
