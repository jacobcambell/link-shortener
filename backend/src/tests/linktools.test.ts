import { validURL, prependHttps } from '../linktools'

test('Should be a valid URL ', () => {
    expect(validURL('google.com')).toBe(true)
    expect(validURL('https://google.com')).toBe(true)
    expect(validURL('htt:google.com')).toBe(false)
    expect(validURL('htt:google.com')).toBe(false)
    expect(validURL(':google.com')).toBe(false)
    expect(validURL('https://google.c')).toBe(false)
    expect(validURL('https://google.com/test/files')).toBe(true)
    expect(validURL('https://https://google.com')).toBe(false)
    expect(validURL('http://')).toBe(false)
    expect(validURL('http://google.com')).toBe(true)
    expect(validURL('ftp://google.com')).toBe(false)
})

test('Should prepend with https:// (if not existing) and replace http with https', () => {
    expect(prependHttps('google.com')).toBe('https://google.com')
    expect(prependHttps('https://google.com')).toBe('https://google.com')
    expect(prependHttps('http://google.com')).toBe('https://google.com')
    expect(prependHttps('web.google.com')).toBe('https://web.google.com')
    expect(prependHttps('http://web.google.com/test/file')).toBe('https://web.google.com/test/file')
})