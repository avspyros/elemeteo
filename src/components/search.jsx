import React from 'react'

export default function search(props) {

  return (
    <div className="max-w-md m-auto text-center">
      <div className="w-1/2 mx-auto mt-10 p-1">
        <form className='flex justify-center' onSubmit={props.handleSubmit}>
          <input
            className="text-neutral-700 font-semibold px-2 py-1 rounded-md outline-none drop-shadow-xl"
            type="text"
            name="cityName"
            autoComplete='off'
            placeholder="enter city name"
            value={props.value}
            onChange={props.handleSearch}
          />
          <button className="px-2 py-1 ml-2 rounded text-blue-500 bg-slate-200 drop-shadow-xl">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  )
}