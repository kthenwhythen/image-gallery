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

	
	const startPage = (
		<div className="flex items-center justify-center h-screen">
			<div>
				<h1 className="block text-6xl text-center w-full pb-6">Image Gallery</h1>
				<SearchForm searchText={(text) => setSearch(text)} />
			</div>
		</div>
	)

	const searchPage = (
		<div>
			<div>
				<h1 className="block text-6xl text-center w-full">Image Gallery</h1>
				<SearchForm searchText={(text) => setSearch(text)} />
			</div>
			{isLoading ? <h1 className="text-6xl text-center mx-auto mt-32">Loading...</h1> : <div className="grid grid-cols-4 gap-4">
				{images.map(image => (
					<ImageCard key={image.id} image={image} />
				))}
			</div>}
		</div>
	)

	return (
		<div className="container mx-auto font-chakra">
			{search ? searchPage : startPage}
		</div>
	)
}
