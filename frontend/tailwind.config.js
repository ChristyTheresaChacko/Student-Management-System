// tailwind.config.js
module.exports = {
  content: [
    "./index.html",
    // This is crucial for React/JS components
    "./src/**/*.{js,jsx,ts,tsx}", 
  ],
  theme: {
    extend: {
      
      colors: {
        'custom-green': '#3DA171',
      },
      borderRadius: {
        '4xl': '2rem', // Equivalent to 32px
        '5xl': '3rem', // Equivalent to 48px
        // You can define any value here
      },
    },
  },
  plugins: [],
};
