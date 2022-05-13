import { Client } from 'faunadb'

// Pega a key do banco no Fauna para poder acessá-lo.
export const fauna = new Client({
    secret: process.env.FAUNADB_KEY,
})