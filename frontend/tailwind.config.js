module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: ['gatsby-plugin-postcss'],
  theme: {
    colors: {
      oxfordblue: '#102752',
      azure: '#117FE7',
      cadetgrey: '#939AA3'
    }
  }
}
