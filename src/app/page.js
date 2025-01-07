import Link from "next/link";

const response = await fetch('http://localhost:3000/api/users/create', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    firstName: "Steve",
    lastName: "Stevenson",
    email: "stevestevenson@fake.com",
    address: "9874 w 343 s",
    city: 'Rummy',
    state: 'JE',
    zip: '15798',
    phone: '555-666-7777',
    image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80',
    estimates: [null],
    invoices: [null]
  })
})

const data = await response.json()
console.log(data);

export default function Home() {
  const quickViewCalendar = process.env.QUICK_VIEW_CALENDAR

  return (
    <>
      <h1 className="main-heading text-4xl text-center mt-10">
        Welcome to EZ-Job Tracker
      </h1>
      <main>
        <div className=" flex justify-center mt-8 mb-16">
          <Link href={'/estimates'}>
            <button className="mr-2 bg-indigo-700 p-3.5 border rounded font-semibold hover:bg-indigo-500 active:bg-indigo-800">Create New Estimate</button>
          </Link>
          <Link href={'/invoices'}>
            <button className="ml-2 bg-indigo-700 p-3.5 border rounded font-semibold hover:bg-indigo-500 active:bg-indigo-800 ">Create New Invoice</button>
          </Link>
        </div>
        <div className="calendar-container">
          <div className="flex calendar-text">
            <h2 className="text-center text-2xl mb-2">Calendar Quick View</h2>
            <a className="flex justify-self-center mb-5 text-gray-400 hover:bg-gray-800 hover:text-gray-200 active:text-white p-1.5 hover:rounded hover:border Íactive:rounded active:bg-gray-600" href="/calendar" >Open Calendar</a>
          </div>
          <iframe className="quick-view-calendar flex justify-self-center mb-20" src={quickViewCalendar} width={0} height={0} frameBorder="0" scrolling="no"></iframe>

        </div>
      </main >
    </>
  );
}