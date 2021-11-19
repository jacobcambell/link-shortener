require('dotenv').config()
import { knex } from 'knex'

export const pg = knex({
    client: 'pg',
    connection: process.env.PG_CONNECTION_STRING
})