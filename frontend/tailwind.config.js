module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#ef5722", // New primary color
        "secondary": "#8caf50", // New secondary color
        "tertiary": "#2196f3", // New tertiary color
        "dark": "#333333", // New dark color
        "gray-light": "#f5f5f5", // New light gray color
      },
      animation: {
        "loader": "loader 1s linear infinite",
        "spin": "spin 2s linear infinite",
        "bounce": "bounce 1s infinite", // New bounce animation
      },
      keyframes: {
        loader: {
          "0%": { transform: "rotate(0) scale(1)" }, // Changed initial state
          "50%": { transform: "rotate(180deg) scale(1.5)" },
          "100%": { transform: "rotate(360deg) scale(1)" }
        },
        spin: {
          "0%": { transform: "rotate(0)" }, // New spin keyframes
          "100%": { transform: "rotate(360deg)" }
        },
        bounce: {
          "0%, 100%": { transform: "translateY(0)" }, // New bounce keyframes
          "50%": { transform: "translateY(-10px)" }
        },
      },
    },
  },
  variants: {
    extend: {
      borderWidth: ['hover'], // Enable border width utility on hover
      boxShadow: ['active'], // Enable box shadow utility on active state
      scale: ['group-hover'], // Enable scale utility on group hover
    },
  },
  plugins: [],
};
