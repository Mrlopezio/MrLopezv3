import React, { useState } from 'react'
// import { Resend } from 'resend'

// const resend = new Resend('re_2V3k5cRm_BDSL4zAv2bXEpUaDmoaGdxEo')

// await resend.emails.send({
// 	from: 'Acme <onboarding@resend.dev>',
// 	to: ['delivered@resend.dev'],
// 	subject: 'hello world',
// 	html: '<p>it works!</p>'
// })
// type Props = {}

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
			{formSent && <p>Form sent</p>}
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
