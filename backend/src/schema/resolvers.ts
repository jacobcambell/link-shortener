import { client } from '../queries';
import { generateShortLink } from '../generate';
import { validURL, prependHttps } from '../linktools'

export const resolvers = {
    Query: {

    },
    Mutation: {
        createShortLink: async (parent, args: { destination: string }) => {
            // Ensure valid destination is provided
            if (validURL(args.destination)) {
                // URL is valid, run through https prepend
                args.destination = prependHttps(args.destination);
            }
            else {
                // Valid url not provided
                return null;
            }

            // Get a short link that is not in use
            let foundLink = false;
            while (!foundLink) {
                let shortCode = generateShortLink();

                // Check if this short link exists in the database
                let results = await client.query(`SELECT COUNT(*) AS c FROM links WHERE shortlink=$1`, [shortCode])

                if (Number(results.rows[0].c) === 0) {
                    // Link does not exist, so we are good to create it (using null owner since it was created by an anonymous user)
                    const sql = `INSERT INTO links (owner_id, destination, shortlink) VALUES (NULL, $1, $2)`;
                    const values = [args.destination, shortCode];
                    await client.query(sql, values)

                    // Mark link as found
                    foundLink = true;
                }
            }
            // client.query(sql, values)
        }
    }
}