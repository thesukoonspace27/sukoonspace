module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      colors: {
        'sukoon-cream': '#efeee6',
        'sukoon-cream-focus' : '#e5e4dc',
        'sukoon-green-light': '#90b0ae',
        'sukoon-green-dark': '#678486',
        'sukoon-warm-text': '#2F4F4F'
      },
      
  },
  plugins: [require('twglow')],
  }
}