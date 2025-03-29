import Link from "next/link";

export default function Home() {
  const quickViewCalendar = process.env.QUICK_VIEW_CALENDAR;

  return (
    <>
      <h1 className="main-heading text-4xl text-center mt-10">
        Welcome to EZ-Job Tracker
      </h1>
      <main>
        <div className=" flex justify-center mt-8 mb-16">
          <Link href={"/pages/createestimate"}>
            <button className="mr-2 bg-indigo-700 p-3.5 border rounded font-semibold hover:bg-indigo-500 active:bg-indigo-800">
              Create New Estimate
            </button>
          </Link>
          <Link href={"/invoices"}>
            <button className="ml-2 bg-indigo-700 p-3.5 border rounded font-semibold hover:bg-indigo-500 active:bg-indigo-800 ">
              Create New Invoice
            </button>
          </Link>
        </div>
        <div className="calendar-container">
          <div className="flex calendar-text">
            <h2 className="text-center text-2xl mb-2">Calendar Quick View</h2>
            <Link href={"/pages/calendar"}>
              <button className="flex justify-self-center mb-5 text-gray-400 hover:bg-gray-800 hover:text-gray-200 active:text-white p-1.5 hover:rounded hover:border Íactive:rounded active:bg-gray-600">
                Open Calendar
              </button>
            </Link>
          </div>
          <iframe
            className="quick-view-calendar flex justify-self-center mb-20"
            src={quickViewCalendar}
            width={0}
            height={0}
            frameBorder="0"
            scrolling="no"
          ></iframe>
        </div>
      </main>
    </>
  );
}
