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
		isLoading ? <h1 className="text-6xl text-center mx-auto mt-32">Loading...</h1> : <div className="grid grid-cols-4 gap-4">
			{images.map(image => (
				<ImageCard key={image.id} image={image} />
			))}
		</div>
	)

	return (
		<div className="container mx-auto font-chakra">
			<div className={!search && 'flex items-center justify-center h-screen'}>
				<div className={search && 'flex justify-items-start py-6'}>
					<a href="/" className={search ? 'block text-3xl w-full' : 'block text-6xl text-center w-full pb-6'}>Image Gallery</a>
					<SearchForm searchText={(text) => setSearch(text)} />
				</div>
			</div>
			{search && searchPage}
		</div>
	)
}
