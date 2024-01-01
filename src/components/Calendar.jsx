import { useEffect, useState } from "react";

//----------- Helper function
function persianDate(date) {
  return new Intl.DateTimeFormat("en-US-u-ca-persian", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  })
    .formatToParts(date)
    .reduce((obj, part) => {
      if (part.type === "year") {
        obj["y"] = +part.value;
      }
      if (part.type === "month") {
        obj["m"] = +part.value;
      }
      if (part.type === "day") {
        obj["d"] = +part.value;
      }
      return obj;
    }, {});
}

function isPersianLeapYear(y) {
  let formatter = new Intl.DateTimeFormat("en-US-u-ca-persian", {
    day: "numeric",
  });
  let day0 = new Date(y, 2, 19);
  let day1 = new Date(y, 2, 20);
  let day2 = new Date(y, 2, 21);
  let day3 = new Date(y, 2, 22);
  if (
    formatter.format(day0) === "30" ||
    formatter.format(day1) === "30" ||
    formatter.format(day2) === "30" ||
    formatter.format(day3) === "30"
  ) {
    return true;
  } else {
    return false;
  }
}

function persianMonthLength(gy, m) {
  return m < 7 ? 31 : m === 12 && !isPersianLeapYear(gy) ? 29 : 30;
}
function firstAndLastDay(date) {
  const pDate = persianDate(date);
  let firstDayOfMonth = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate() - (pDate.d - 1)
  );
  const monthLength = persianMonthLength(date.getFullYear(), pDate.m);
  const lastDayOfMonth = new Date(
    firstDayOfMonth.getFullYear(),
    firstDayOfMonth.getMonth(),
    firstDayOfMonth.getDate() + monthLength - 1
  );

  return [firstDayOfMonth, lastDayOfMonth];
}

function daysInMonth(firstDay, lastDay) {
  let days = [];
  let pointer = new Date(firstDay);

  while (pointer.getTime() <= lastDay.getTime()) {
    days.push(new Date(pointer));
    pointer.setDate(pointer.getDate() + 1);
  }

  return days;
}
//-----------

const Calendar = ({ value, onChange }) => {
  const [date, setDate] = useState(value);
  const [selectedDay, setSelectedDay] = useState(value);

  const names = ["ش", "ی", "د", "س", "چ", "پ", "ج"];
  const [firstDayOfMonth, lastDayOfMonth] = firstAndLastDay(date);
  const days = daysInMonth(firstDayOfMonth, lastDayOfMonth);

  useEffect(() => {
    setSelectedDay(value);
    setDate(value);
  }, [value]);

  function columnStart(day) {
    //col-start-7 col-start-6 col-start-5 col-start-4 col-start-3 col-start-2 col-start-1
    return "col-start-" + (((day + 1) % 7) + 1);
  }

  return (
    <div
      dir='rtl'
      className='p-2 w-fit border border-neutral-300 rounded shadow-sm'
    >
      <div className='w-full flex items-center justify-between h-8 border-b text-neutral-900 text-xs font-semibold'>
        <button
          className='w-10 h-8 flex items-center justify-center text-neutral-600'
          onClick={() => setDate(new Date(firstDayOfMonth.getTime() - 1))}
        >
          <span className='inline-block w-5'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              strokeWidth='1'
              stroke='currentColor'
              fill='none'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <path stroke='none' d='M0 0h24v24H0z' fill='none' />
              <path d='M9 6l6 6l-6 6' />
            </svg>
          </span>
        </button>
        <div className=''>
          {new Intl.DateTimeFormat("fa-IR", {
            year: "numeric",
            month: "short",
          }).format(firstDayOfMonth)}
        </div>
        <button
          className='w-10 h-8 flex items-center justify-center text-neutral-600'
          onClick={() =>
            setDate(new Date(lastDayOfMonth.getTime() + 60 * 60 * 24 * 1000))
          }
        >
          <span className='inline-block w-5'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              strokeWidth='1'
              stroke='currentColor'
              fill='none'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <path stroke='none' d='M0 0h24v24H0z' fill='none' />
              <path d='M15 6l-6 6l6 6' />
            </svg>
          </span>
        </button>
      </div>
      <div className='grid grid-cols-7 place-items-center h-8 text-xs font-semibold  text-gray-400'>
        {names.map((name, i) => (
          <div key={i}>{name}</div>
        ))}
      </div>

      <div id='body' className='grid grid-cols-7 text-sm'>
        {days.map((day, i) => (
          <div
            key={day.getTime()}
            className={` p-1 ${columnStart(day.getDay())}`}
          >
            <button
              className={`mx-auto flex h-8 w-8 items-center justify-center rounded text-sm ${
                day.toDateString() === selectedDay?.toDateString()
                  ? "bg-neutral-900 text-white"
                  : ""
              }`}
              onClick={() => onChange(day)}
            >
              <time dateTime={day}>{(i + 1).toLocaleString("fa-IR")}</time>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
