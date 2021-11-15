import { client } from '../queries';
import { validURL, prependHttps, generateShortLink } from '../linktools'
import * as EmailValidator from 'email-validator'
import jsonwebtoken from 'jsonwebtoken'
import CryptoJS from 'crypto-js';

export const resolvers = {
    Query: {

    },
    Mutation: {
        createShortLink: async (parent, args: { destination: string }) => {
            // Trim potential whitespace off destination
            args.destination = args.destination.trim()

            // Ensure valid destination is provided
            if (validURL(args.destination)) {
                // URL is valid, run through https prepend
                args.destination = prependHttps(args.destination);
            }
            else {
                // Valid url not provided
                return { errorMessage: 'Please provide a valid URL' };
            }

            // Get a short link that is not in use
            let foundLink = false;
            while (!foundLink) {
                let shortCode = generateShortLink();

                // Check if this short link exists in the database
                let results = await client.query(`SELECT COUNT(*) AS c FROM links WHERE shortlink=$1`, [shortCode])

                if (Number(results.rows[0].c) === 0) {
                    // Link does not exist, so we are good to create it (using null owner since it was created by an anonymous user)
                    const sql = `INSERT INTO links (owner_id, destination, shortlink) VALUES (NULL, $1, $2) RETURNING id, destination, shortlink`;
                    const values = [args.destination, shortCode];
                    let results = await client.query(sql, values)

                    // Mark link as found
                    foundLink = true;

                    // Return this link
                    return {
                        id: results.rows[0].id,
                        destination: results.rows[0].destination,
                        shortlink: results.rows[0].shortlink
                    }
                }
            }
        },
        registerAccount: async (parent, args: { email: string, password: string }) => {
            // user sent email, password
            // return either {token} or {errorMessage}

            // Email validation
            if (!EmailValidator.validate(args.email)) {
                return { errorMessage: 'Please provide a valid email address' }
            }

            // Password validation
            if (args.password.length < 6) {
                return { errorMessage: 'Your password should be at least 6 characters' }
            }

            if (args.password.length > 32) {
                return { errorMessage: 'Your password should not be more than 32 characters' }
            }

            // Check if this email already exists in the database
            let results = await client.query('SELECT COUNT(*) AS c FROM users WHERE email=$1', [args.email])

            if (Number(results.rows[0].c) > 0) {
                return { errorMessage: 'Email already exists' }
            }

            // Hash the user's password
            const hashed_password = CryptoJS.SHA256(args.password).toString()

            // Create the user in the database
            const c = await client.query('INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id', [args.email, hashed_password])

            // Save the user's ID
            const user_id = c.rows[0].id;

            // Sign jwt for this user, send back to them with their user id
            const jwt = jsonwebtoken.sign({ user_id }, process.env.JWT_SECRET)

            return { token: jwt }
        }
    },
    createShortLinkResults: {
        __resolveType: (obj) => {
            if (obj.errorMessage) {
                return 'Error'
            }

            if (obj.shortlink) {
                return 'Link'
            }
        }
    },
    registerAccountResults: {
        __resolveType: (obj) => {
            if (obj.token) {
                return 'JWT'
            }

            if (obj.errorMessage) {
                return 'Error'
            }
        }
    }
}