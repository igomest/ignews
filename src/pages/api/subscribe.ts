/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from "next"
import { query as q } from "faunadb"
import { getSession } from "next-auth/react"
import { fauna } from "../../services/fauna"
import { stripe } from "../../services/stripe"

type User = {
    ref: {
        id: string;
    }
    data: {
        stripe_customer_id: string;
    }
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
    // Verfica se o método da requisição é POST. Se for true, executa as funções abaixo
    if (req.method === 'POST') {
        // pega a sessão do usuário através dos cookies
        const session = await getSession({ req })

        //salvando usuário no fauna
        const user = await fauna.query<User>(
            q.Get(
                q.Match(
                    q.Index('user_by_email'),
                    q.Casefold(session.user.email)
                )
            )
        )

        let customerId = user.data.stripe_customer_id

        // se o usuário salvo no banco, ainda não tiver um stripe_customer_id, um novo customer será criado para ele
        if (!customerId) {
            const stripeCustomer = await stripe.customers.create({
                email: session.user.email,
            })

            await fauna.query(
                q.Update(
                    q.Ref(q.Collection('users'), user.ref.id),
                    {
                        data: {
                            stripe_customer_id: stripeCustomer.id,
                        }
                    }
                )
            )

            customerId = stripeCustomer.id
        }

        // Antes da intenção de compra. criar um customer no stripe, diferente do usuário que está no FaunaDB. Porque o usuário do Fauna não tem relação com o usuário criado no Stripe.


        const stripeCheckoutSession = await stripe.checkout.sessions.create({
            customer: customerId,
            payment_method_types: ['card'],
            billing_address_collection: 'required', // obriga o usuário a preencher endereço, ou deixa para o stripe lidar com modo auto
            line_items: [
                { price: 'price_1KpBxZJBWmnFCVabhKEkzrxu', quantity: 1 }
            ],
            mode: 'subscription',
            allow_promotion_codes: true,
            success_url: process.env.STRIPE_SUCESS_URL,
            cancel_url: process.env.STRIPE_CANCEL_URL
        })

        return res.status(200).json({ sessionId: stripeCheckoutSession.id })
        // se não for POST, retorna que o método aceito é POST
    } else {
        res.setHeader('Allow', 'POST')
        res.status(405).end('Method not allowed')
    }
}