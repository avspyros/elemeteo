export default function weather({ city, icon, weatherText, temperature, min, max }) {

  const tooltip = "pointer-events-none absolute -top-8 left-0 w-max opacity-0 transition-opacity group-hover:opacity-100"

  return (
    <div className="font-mono text-slate-100 mb-8">
      <div className="mt-4 p-2">
        <h2 className="font-semibold tracking-wide text-3xl drop-shadow-xl">
          {city}
        </h2>
      </div>
      <div className="flex justify-center mt-8 items-center bg-blue-600 drop-shadow-xl rounded-md">
        <div className="flex-1 group relative">
          <img className="inline-block" src={icon} alt="icon" />
          <span className={`${tooltip} p-2 rounded-md bg-blue-600`}>
            {weatherText}
          </span>
        </div>
        <div className="flex-1">
          <h2 className="tracking-wide text-6xl">
            {temperature}{temperature && <span className="text-lg absolute after:content-['\2103']"></span>}
          </h2>
        </div>
        <div className="flex-1 tracking-wide text-xl">
          <p className="text-teal-400">{min}<span className="text-xs"> min</span></p>
          <p className="text-amber-400">{max}<span className="text-xs"> max</span></p>
        </div>
      </div>
    </div>
  )

}
