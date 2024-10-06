import type { APIRoute } from "astro";
import { Resend } from "resend";

// const resend = new Resend(import.meta.env.RESEND_API_KEY)
const resend = new Resend('re_2V3k5cRm_BDSL4zAv2bXEpUaDmoaGdxEo')

export const POST: APIRoute = async ({ request }) => {
  const data = await request.formData();
  const name = data.get("name");
  const email = data.get("email");
  const phone = data.get("tel");
  const website = data.get("website");
  const message = data.get("message");
  // Validate the data - you'll probably want to do more than this
  if (!name || !email || !message) {
    return new Response(
      JSON.stringify({
        message: "Missing required fields",
      }),
      { status: 400 }
    );
  }
  // Do something with the data, then return a success response
  console.log("Received data:", {
    name,
    email,
    phone,
    website,
    message,
  });

  if (data) {
    const sendEmail = await resend.emails.send({
      from: 'MrLopez <noreply@mrlopez.io>',
      to: 'javier@mrlopez.io',
      subject: 'Hello MrLopez',
      html: `<h2>Contact from Mrlopez.io</h2><br/><p>Name: ${name}</p><p>Email: ${email}</p><p>Phone: ${phone}</p><p>Website: ${website}</p><p>Message: ${message}</p>`
    })

    if (sendEmail.data) {
        return new Response(
          JSON.stringify({
            message: `Email to ${name} has been sent Successfuly!`
          }),
          { status: 200,
            statusText: 'Email sent'
           }
        );
    }
    else{
        return new Response(
          JSON.stringify({
            message: sendEmail.error
          }),
          { status: 500,
            statusText: 'Email NOT sent, internal server error.'
           }
        );
    }
  }

  return new Response(
    JSON.stringify({
      message: "Success!"
    }),
    { status: 200 }
  );
};