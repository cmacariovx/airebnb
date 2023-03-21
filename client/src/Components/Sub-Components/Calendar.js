import React from "react";

import './Calendar.css'

function Calendar() {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    const nextMonth = (currentMonth + 1) % 12;
    const nextYear = currentMonth === 11 ? currentYear + 1 : currentYear;

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

    const renderCalendarTable = (monthData) => (
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
                {week.map((day, index) => (
                  <td key={index}>{day}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
    )

    const leftCalendarData = generateCalendar(currentMonth, currentYear)
    const rightCalendarData = generateCalendar(nextMonth, nextYear)

    return (
        <div className="calendarContainer">
            <div className="calendarMonthContainer">
                <div className="calendarLeftMonthContainer">
                    <p className="calendarLeftMonthText">March 2023</p>
                    <div className="calendarLeftArrowContainer">
                        <div className="calendarLeftArrowCircleContainer">
                            <i className="fa-solid fa-chevron-left calendarLeftArrow"></i>
                        </div>
                    </div>
                </div>
                <div className="calendarRightMonthContainer">
                    <p className="calendarRightMonthText">April 2023</p>
                    <div className="calendarRightArrowContainer">
                        <div className="calendarRightArrowCircleContainer">
                            <i className="fa-solid fa-chevron-right calendarRightArrow"></i>
                        </div>
                    </div>
                </div>
            </div>
            <div className="calendarBodyContainer">
                <div className="calendarLeftBodyContainer">
                    {renderCalendarTable(leftCalendarData)}
                </div>
                <div className="calendarRightBodyContainer">
                    {renderCalendarTable(rightCalendarData)}
                </div>
            </div>
        </div>
    )
}

export default Calendar
