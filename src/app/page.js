import Link from "next/link";

export default function Home() {
  const quickViewCalendar = process.env.QUICK_VIEW_CALENDAR

  return (
    <>
      <h1 className="text-4xl text-center mt-10 mb-10">
        Welcome to EZ-Job Tracker
      </h1>
      <main>
        <div className="flex justify-self-center justify-around mt-12 mb-12 w-4/5 max-w-3xl">
          <Link href={'/estimates'}>
            <button className="bg-indigo-700 p-3.5 border rounded font-semibold hover:bg-indigo-500 active:bg-indigo-800">Create New Estimate</button>
          </Link>
          <Link href={'/invoices'}>
            <button className="bg-indigo-700 p-3.5 border rounded font-semibold hover:bg-indigo-500 active:bg-indigo-800 ">Create New Invoice</button>
          </Link>
        </div>
        <div>
          <h2 className="text-center text-2xl mb-2">Calendar Quick View</h2>
          <a className="flex justify-self-center mb-5 text-gray-400 hover:bg-gray-800 hover:text-gray-200 active:text-white p-1.5 hover:rounded hover:border active:rounded active:bg-gray-600" href="/calendar" >Open Calendar</a>
          <iframe className="flex justify-self-center mb-20" src={quickViewCalendar} width="300" height="400" frameBorder="0" scrolling="no"></iframe>
        </div>
      </main>
    </>
  );
}