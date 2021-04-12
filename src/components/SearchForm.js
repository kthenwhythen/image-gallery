import { useState } from 'react'

export default function SearchForm({ searchText }) {
    const [text, setText] = useState('')

    const formHandler = (e) => {
		e.preventDefault()
		searchText(text)
	}

    return (
        <form onSubmit={formHandler} className="duration-150 w-full max-w-sm flex justify-center">
            <input onChange={e => setText(e.target.value)} placeholder="Type something..." className="h-8 font-chakra text-center rounded block bg-gray-100 w-full mr-3 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent" type="text"/>
            <button className="w-24 h-8 rounded font-chakra bg-gray-900 text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50" type="submit">Search</button>
        </form> 
    )
}