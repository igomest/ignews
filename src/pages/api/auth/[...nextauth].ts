import { query as q } from 'faunadb'
import { fauna } from '../../../services/fauna'


import NextAuth from 'next-auth'
import GithubProvider from "next-auth/providers/github"


export default NextAuth({
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            authorization: {
                params: {
                    scope: 'read:user'
                }
            }
        }),
    ],
    jwt: {
      secret: process.env.NEXTAUTH_SECRET
    },
    callbacks: {
        // Inserindo o e-mail do usuário no banco, após ele
        async signIn({ user, account, profile }) {
            const { email } = user

            try {
                await fauna.query(
                    q.Create(
                        q.Collection('users'),
                        { data: { email } }
                    )
                )

                return true
            } catch {
                return false
            }
        }
    }
})