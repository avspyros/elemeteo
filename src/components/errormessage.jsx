export default function errormessage(props) {
  return (
    props.error && <div className="w-48 mx-auto mt-10 p-1 bg-red-300 border-solid border border-red-500 rounded">
      <p className="text-md text-red-800">{props.error}</p>
    </div>
  )
}