/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './public/index.html',
    './node_modules/@yext/search-ui-react/lib/**/*.js'
  ],
  theme: {
    extend: {
      typography: ({ theme }) => ({
        sm: {
          css: {
            fontSize: '0.75rem',
            lineHeight: '1.0rem'
          }
        },
      })
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/forms")({
      strategy: 'class',
    }),
    require("@tailwindcss/typography"),
  ],
}