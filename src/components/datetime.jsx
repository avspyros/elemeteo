export default function datetime(props) {
  return (
    <div className="px-1 py-2 rounded-md bg-blue-700">
      <p className="px-1 text-blue-100">
        <span className="text-xl italic tracking-wide text-slate-100">{props.localDateTime}</span>
      </p>
    </div>
  )
}
