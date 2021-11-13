/** Checks whether url is a valid domain name. */
export const validURL = (url: string) => {
    const pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return !!pattern.test(url);
}

/** Add https:// to beginning of string if neither https:// or http:// exist
 * Assumes that url is a valid url based on validURL function
*/
export const prependHttps = (url: string) => {
    if (url.startsWith('https://')) {
        // URL already starts with https, just return itself
        return url;
    }

    if (url.startsWith('http://')) {
        // Replace http with https
        return url.replace('http://', 'https://')
    }

    if (!url.startsWith('https://') && !url.startsWith('http://')) {
        // Url doesn't start with either http or https, so we'll add https
        return `https://${url}`;
    }
}