require('dotenv').config()
import { validURL, prependHttps, generateShortLink } from '../linktools'
import * as EmailValidator from 'email-validator'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { pg } from '../knex'

export const resolvers = {
    Query: {
        allLinks: async (parent, args, context) => {
            try {
                let decoded: any = jwt.verify(context.jwt, process.env.JWT_SECRET);

                const { user_id } = decoded;

                const links = await pg('links').select().where({ owner_id: user_id })

                return links;
            }
            catch (e) {

            }
        },
        globalAnalytics: async (parent, args, context) => {
            interface DateAnalytics {
                date: string;
                numClicks: number;
            }

            let Analytics: DateAnalytics[] = [];

            try {
                let decoded: any = jwt.verify(context.jwt, process.env.JWT_SECRET);

                const { user_id } = decoded;

                // Loop through past 7 days and build array of DateAnalytics
                for (let i = 0; i < 7; i++) {
                    await pg.raw(`SELECT COUNT(*) FROM clicks, users, links WHERE DATE(clicks.click_time) = CURRENT_DATE - INTERVAL '${i} days' AND clicks.link_id=links.id AND links.owner_id=users.id AND users.id=? `, [user_id]).then((results) => {
                        let day = new Date();
                        let dd = String(day.getDate() - i).padStart(2, '0');
                        let mm = String(day.getMonth() + 1).padStart(2, '0'); //January is 0!

                        let finalDay = mm + '/' + dd;

                        Analytics.push({
                            date: finalDay,
                            numClicks: results.rows[0].count
                        })
                    })
                }

                Analytics.reverse();
                return Analytics;
            }
            catch (e) {

            }
        }
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
                let results = await pg.count().from('links').where({ shortlink: shortCode })

                if (Number(results[0].count) === 0) {
                    // Link does not exist, so we are good to create it (using null owner since it was created by an anonymous user)
                    let results = await pg('links').insert({ destination: args.destination, shortlink: shortCode, created: 'NOW()' }).returning(['id', 'destination', 'shortlink'])

                    // Mark link as found
                    foundLink = true;

                    // Return this link
                    return {
                        id: results[0].id,
                        destination: results[0].destination,
                        shortlink: results[0].shortlink
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
            let results = await pg.count().from('users').where({ email: args.email })

            if (Number(results[0].count) > 0) {
                return { errorMessage: 'Email already exists' }
            }

            // Hash the user's password
            const hashed_password = await bcrypt.hash(args.password, 10);

            // Create the user in the database
            const c = await pg('users').insert({ email: args.email, password: hashed_password }).returning(['id'])

            // Save the user's ID
            const user_id = c[0].id;

            // Sign jwt for this user, send back to them with their user id
            const token = jwt.sign({ user_id }, process.env.JWT_SECRET)

            return { token }
        },
        login: async (parent, args: { email: string, password: string }) => {
            // Validate email
            if (!EmailValidator.validate(args.email)) {
                return { errorMessage: 'Please provide a valid email address' }
            }

            // Get this user's password from the database
            let results = await pg('users').where({ email: args.email }).column('id', 'password').select()

            if (results.length === 0) {
                // No password found for the given email/user
                return { errorMessage: 'No user with that email address found' }
            }

            const user_id = results[0].id;
            const user_password = results[0].password;

            // Compare given password to database password
            let match = await bcrypt.compare(args.password, user_password);

            if (match) {
                // Successful login, create JWT for this user and return to them
                const token = jwt.sign({ user_id }, process.env.JWT_SECRET)
                return { token }
            } else {
                return { errorMessage: 'Incorrect email or password ' }
            }
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
    },
    loginResults: {
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