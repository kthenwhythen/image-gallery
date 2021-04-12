import { useEffect, useState } from 'react'
import ImageCard from './components/ImageCard'
import SearchForm from './components/SearchForm'

export default function App() {
	const [images, setImages] = useState([])
	const [isLoading, setIsLoading] = useState(true)
	const [search, setSearch] = useState('')

	useEffect(() => {
		const fetchImages = async () => {
			const res = await fetch(`https://pixabay.com/api/?key=${process.env.REACT_APP_PIXABAY_API_KEY}&q=${search}&image_type=photo&pretty=true`)
			const data = await res.json()
			setImages(data.hits)
			setIsLoading(false)
		}
		if (search) {
			setIsLoading(true)
			fetchImages()
		}
	}, [search])

	const searchPage = (
		isLoading ? <h1 className="text-6xl text-center mx-auto mt-32">Loading...</h1> : <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
			{images.map(image => (
				<ImageCard key={image.id} image={image} />
			))}
		</div>
	)

	return (
		<div className="container px-3 mx-auto font-chakra">
			<div className={!search && 'flex items-center justify-center h-screen'}>
				<div className={search && 'flex justify-items-start py-6'}>
					<a href="/" className={search ? 'block text-xl md:text-3xl w-full' : 'block text-6xl text-center w-full pb-6'}>Image Gallery</a>
					<SearchForm searchText={(text) => setSearch(text)} />
				</div>
			</div>
			<div className="flex justify-center">
				{search && searchPage}
			</div>
			{!isLoading && images.length === 0 && <h1 className="text-6xl text-center mx-auto mt-32">No results</h1>}
		</div>
	)
}
