import React, { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'

type Props = {
	title: string
	text: string
	tags: string[]
	logo: string
	image: string
	id: string
	links: links[]
}
type links = {
	text: string
	url: string
}

const ProjectCard = (props: Props) => {
	const { title, text, tags, logo, image, id, links } = props
	const { ref, inView } = useInView({
		threshold: 0.7
		// triggerOnce: true
	})

	useEffect(() => {
		if (inView) {
			console.log('in view', id)
			// let card = document.getElementById(id);
			let cards = document.querySelectorAll('.projects-content-slider-item')

			cards.forEach((card: any) => {
				card.id === id && (card.style.opacity = '1')
				card.id !== id && (card.style.opacity = '0.3')
			})
		}
	}, [inView])

	return (
		<div className="projects-content-slider-item" id={id} ref={ref}>
			{/* <!-- Card --> */}
			<div className="projects-content-slider-item-card">
				{/* <!-- BG --> */}
				<div className="projects-content-slider-item-card-bg">
					{/* <!-- dots --> */}
					<div className="projects-content-slider-item-card-bg-dots">
						<svg width="1200px" height="480px">
							<pattern
								id="pattern-circles"
								width="24"
								height="24"
								patternUnits="userSpaceOnUse"
								patternContentUnits="userSpaceOnUse"
							>
								<circle
									id="pattern-circle"
									cx="10"
									cy="10"
									r="1.6257413380501518"
									fill="#333"
								></circle>
							</pattern>
							<rect
								id="rect"
								x="0"
								y="0"
								width="100%"
								height="100%"
								fill="url(#pattern-circles)"
							></rect>
						</svg>
					</div>
					{/* <!-- gradient --> */}
					<div className="projects-content-slider-item-card-bg-gradient"></div>
				</div>
				{/* <!-- tags --> */}
				<div className="projects-content-slider-item-card-tags">
					{tags.map((tag: string, i: number) => (
						<p key={i}>{tag}</p>
					))}
				</div>
				{/* <!-- mockup --> */}
				<div className="projects-content-slider-item-card-mockup">
					<img src={image} alt="Webflow" />
				</div>
				<div className="projects-content-slider-item-card-logo">
					<img src={logo} alt="Webflow" />
				</div>
			</div>
			<div className="projects-content-slider-item-info">
				<div className="projects-content-slider-item-info-company">
					<h2>{title}</h2>
					<p>{text}</p>
				</div>
				<div className="projects-content-slider-item-info-links">
					{links.map((link: links, i: number) => (
						<React.Fragment key={i}>
							<Link text={link.text} url={link.url} />
						</React.Fragment>
					))}
					{/*                     
					<Link text="Latest project" href="#" />
					<Link text="Live site" href="#" /> */}
				</div>
			</div>
		</div>
	)
}

export default ProjectCard

const Link = (props: links) => {
	const { text, url } = props
	return (
		<a
			href={url}
			className="button-link"
			target="_blank"
			rel="nofollow noopener noreferrer external"
		>
			<div className="button-link-text">{text}</div>
			<div className="button-link-arrow">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					className="lucide lucide-move-up-right"
				>
					<path d="M13 5H19V11" />
					<path d="M19 5L5 19" />
				</svg>
			</div>
		</a>
	)
}
