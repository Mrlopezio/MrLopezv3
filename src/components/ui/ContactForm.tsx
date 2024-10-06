import React, { useState } from 'react'

const ContactForm = () => {
	const [formSent, setFormSent] = useState(false)
	const [sending, setSending] = useState(false)

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setSending(true)
		const emailToSend = await fetch('/api/sendForm', {
			method: 'POST',
			body: new FormData(e.currentTarget)
		})
			.then((res) => res.json())
			.then((data) => data.message)
		console.log('Email sent', emailToSend)

		setTimeout(() => {
			setFormSent(true)
			setSending(false)
		}, 2000)
	}

	return (
		<>
			{formSent && (
				<div className="contact-content-form-sent">
					<h3>Thank you for reaching out!</h3>
					<p>
						Success! Your message has been sent. We will review your inquiry and respond as soon as
						possible. Excited to connect with you!
					</p>
				</div>
			)}
			{!formSent && (
				<form method="POST" action="/api/sendForm" onSubmit={handleSubmit}>
					<div className="contact-content-form-row">
						<div className="contact-content-form-row-input">
							<input id="name" name="name" type="text" required />
							<label htmlFor="name">Name</label>
						</div>
						<div className="contact-content-form-row-input">
							<input id="tel" name="tel" type="tel" required />
							<label htmlFor="tel">Phone</label>
						</div>
					</div>

					<div className="contact-content-form-row">
						<div className="contact-content-form-row-input">
							<input id="email" name="email" type="email" required />
							<label htmlFor="email">Email</label>
						</div>
						<div className="contact-content-form-row-input">
							<input id="website" name="website" type="url" />
							<label htmlFor="website">Currrent website</label>
						</div>
					</div>
					<div className="contact-content-form-row">
						<div className="contact-content-form-row-input">
							<textarea id="message" name="message" required />
							<label htmlFor="message">Message</label>
						</div>
					</div>
					<button type="submit" className="button-form">
						{sending ? 'Sending...' : 'Send'}
					</button>
				</form>
			)}
		</>
	)
}

export default ContactForm
