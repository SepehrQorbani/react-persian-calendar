import { useState } from "react";
import Calendar from "./components/Calendar";

function App() {
  const [date, setDate] = useState(new Date());
  return (
    <div className='w-screen h-screen flex flex-col justify-center items-center'>
      <Calendar value={date} onChange={setDate} />

      <div className='mt-8 text-sm flex space-x-8 p-4 bg-neutral-100 rounded'>
        <button
          className='border border-neutral-500 px-4 py-1 text-neutral-900 rounded hover:bg-neutral-900 hover:text-neutral-50 transition-colors'
          onClick={() =>
            setDate((prev) => new Date(prev.getTime() + 60 * 60 * 24 * 1000))
          }
        >
          روز بعد
        </button>
        <span>
          {new Intl.DateTimeFormat("fa-Ir", {
            day: "numeric",
            month: "numeric",
            year: "numeric",
          }).format(date)}
        </span>

        <button
          className='border border-neutral-500 px-4 py-1 text-neutral-900 rounded hover:bg-neutral-900 hover:text-neutral-50 transition-colors'
          onClick={() =>
            setDate((prev) => new Date(prev.getTime() - 60 * 60 * 24 * 1000))
          }
        >
          روز قبل
        </button>
      </div>
    </div>
  );
}

export default App;
