/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    screens: {
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }
      '2xl': '2000px',
      // => @media (min-width: 1536px) { ... }

    //   '2xl': '1536px',
    //   // => @media (min-width: 1536px) { ... }
    
      // 'sm': {'min': '640px', 'max': '767px'},
      // // => @media (min-width: 640px and max-width: 767px) { ... }

      // 'md': {'min': '768px', 'max': '1023px'},
      // // => @media (min-width: 768px and max-width: 1023px) { ... }

      // 'lg': {'min': '1024px', 'max': '1279px'},
      // // => @media (min-width: 1024px and max-width: 1279px) { ... }

      // 'xl': {'min': '1280px'},
      // // => @media (min-width: 1280px) { ... }

      // '2xl': {'min': '1536px'},
      // // => @media (min-width: 1536px) { ... }
    }
  },
  plugins: [
    // ...
    require('@tailwindcss/forms'),
  ],
};