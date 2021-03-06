export default function ImageCard({ image }) {
    const tags = image.tags.split(',')
    
    return (
        <div className="rounded overflow-hidden bg-gray-100">
			<img src={image.webformatURL} alt="" className="w-full"/>
			<div className="px-6 py-4">
				<div className="font-bold text-gray-800 text-xl">
					Photo by {image.user}
				</div>
				<ul>
					<li>
						<strong>Views: </strong>
						{image.views}
					</li>
					<li>
						<strong>Downloads: </strong>
						{image.downloads}
					</li>
					<li>
						<strong>Likes: </strong>
						{image.likes}
					</li>
				</ul>
			</div>
			<div className="px-6 py-4">
                {tags.map(tag => (
                    <span key={tag} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
					    #{tag}
				    </span>
                ))}
			</div>
		</div>
    )
}