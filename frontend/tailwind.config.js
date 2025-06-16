// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
    darkMode: "class", // Enable dark mode support
  theme: {
    extend: {
      animation: {
        "slide-in": "slideIn 0.3s ease-out",
      },
      keyframes: {
        slideIn: {
          "0%": { opacity: 0, transform: "translateX(100%)" },
          "100%": { opacity: 1, transform: "translateX(0)" },
        },
      },
    },
  },
  plugins: [],
};
