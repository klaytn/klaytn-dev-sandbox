module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}', 'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        grey: '#e5dede',
        lightorange: '#ff8c00',
        orange: '#ff2f00',
        magma: '#850000',
        umber: '#30211c',
      },
      fontFamily: {
        Montserrat: ['Montserrat', 'sans-serif'],
        Roboto: ['Roboto', 'sans-serif'],
        Outfit: ['Outfit', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}
