import { loadStripe } from "@stripe/stripe-js"

//consumindo o stripe de forma pública no Front-end
export async function getStripeJs() {
    const stripeJs = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY) 

    return stripeJs
}