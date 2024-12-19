export default function Calendar() {
  const FULL_CALENDAR = process.env.QUICK_VIEW_CALENDAR

  return (
    <main>
      <h1 className="text-white text-4xl text-center mt-10 mb-10">Calendar</h1>
      <div className='responsiveCal'>
        <div className='deskContent'>
          <iframe src={FULL_CALENDAR} width="800" height="600" frameBorder="0" scrolling="no"></iframe>
        </div>
        <div className='phoneContent'>
          <iframe src={FULL_CALENDAR} width="800" height="600" frameBorder="0" scrolling="no"></iframe>
        </div>
      </div>
    </main>
  )
}