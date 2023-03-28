/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" }
        },
        textToWhite: {
          "0%": { color: "white" },
        },
        textToGreen: {
          "0%, 95%": { color: "#49BF7C" },
        },
        animationTrigger: {}
      },
      animation: {
        wiggle: "wiggle 200ms ease-in-out",
        textToWhite: 'textToWhite 2s ease-in-out',
        textToGreen: 'textToGreen 1.5s ease-in-out',
        animationTrigger: 'animationTrigger 1.5s ease-in-out'
      },
      colors: {
        'primary/purple': '#8928F9',
        'primary/black': '#1E1B1D',
        'secondary/violet': '#9E4784',
        'secondary/light-purple': '#A053FA',
        'secondary/purple': '#66347F',
        'secondary/gray': '#CCCCCC',
        'secondary/blue': '#37306B',
        'light-purple': '#9A6CD9',
        'medium-purple':'#52378C',
        'dark-purple' : '#342359',
        'custom-green': '#49BF7C',
        'custom-red': '#A4362C',
        'gray/brown': '#8C8B77',
        'yellowish/white': '#F2E9CE',
        'yellow': '#8372A6'
      }
    },
    fontFamily: {
      heading: ['Montserrat', 'sans-serif'],
      sans: ['Lato', 'sans-serif']
    }
  },
  plugins: [],
}


