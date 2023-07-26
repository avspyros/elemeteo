
export default function prognosis({ day, icon, weatherText, min, max }) {
  const tooltip = "pointer-events-none absolute left-2/4 w-max opacity-0 transition-opacity group-hover:opacity-100"
  return (
    <div className="font-semibold text-lg text-slate-100">
      <div className="flex justify-between items-center border-b border-slate-300">
        <div className="px-2 flex-1 flex justify-start">
          <p>{day}</p>
        </div>
        <div className="px-2 flex-1 flex justify-center group relative">
          <img src={`${icon}`} alt="icon" />
          <span className={`${tooltip} text-sm font-normal px-2 py-1 rounded-md bg-blue-400`}>
            {weatherText}
          </span>
        </div>
        <div className="px-2 flex-1 flex justify-end">
          <p><span>{min}</span> - <span>{max}</span></p>
        </div>
      </div>
    </div>
  )
}
