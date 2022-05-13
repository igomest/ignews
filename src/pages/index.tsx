import { GetStaticProps } from 'next'
import Head from 'next/head'
import { stripe } from '../services/stripe'

import { SubscribeButton } from '../components/SubscribeButton'
import { HomeProps } from '../interface/propTypes'

import styles from './home.module.scss'


export default function Home({ product }: HomeProps) {
  return (
    <>
      <Head>
        <title>Home | ig.news</title>
      </Head>

      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👏 Hey, welcome</span>
          <h1>News about the <span>React</span> world.</h1>

          <p>
            Get acess to all the publications <br />
            <span>for {product.amount} month</span>
          </p>
          <SubscribeButton priceId={product.priceId} />
        </section>

        <img src="./images/avatar.svg" alt="Girl coding" />
      </main>
    </>
  )
}


export const getStaticProps: GetStaticProps = async () => {
  // Essa função é para que o Next utilize o SSG, buscando o preço do produto. Abaixo tem o price, contendo o id do price/produto no Stripe. Temos também um objeto de produt, contendo o id do preço e o preço sendo formatado para o formato en-US. 
  const price = await stripe.prices.retrieve('price_1KpBxZJBWmnFCVabhKEkzrxu')

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price.unit_amount / 100),
  }
  
  // Logo no final, temos um revalidate de a cada 1min, um novo HTML estático é gerado em 24hrs. Ou seja, se em 1min, a página for acessada 1 milhão de vezes, os usuários verão o mesmo HTML estático da página gerado pelo SSG. Depois de 1min, a página é reconstruída novamente, com um novo HTML estático. Assim o ciclo se repete e a aplicação fica mais perfomática.
  // Revalidate = reconstrução da página.


  return {
    props: {
      product,
    },
    revalidate: 60 * 60 * 24, // 24 hours
  }
}