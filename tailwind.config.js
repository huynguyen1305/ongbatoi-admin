import TypoPlugin from "@tailwindcss/typography";
import FormsPlugin from "@tailwindcss/forms";
import ContainerQueriesPlugin from "@tailwindcss/container-queries";
import AspectRationPlugin from "@tailwindcss/aspect-ratio";

/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  content: ["./index.html", "./src/**/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    screens: {
      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      fontFamily: {
        sans: ["Dosis", "sans-serif"],
      },
    },
  },
  plugins: [
    TypoPlugin,
    FormsPlugin,
    ContainerQueriesPlugin,
    AspectRationPlugin,
  ],
  corePlugins: {
    preflight: false,
  },
};
