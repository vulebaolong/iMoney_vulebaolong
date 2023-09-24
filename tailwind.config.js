/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
    darkMode: "class", // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                "dark": "#363853",
                "primary": "#1668dc",
                "green": "#67D4CA",
                "red": "#F28080",
                "dark-light": "#F8FAFB",
            },
        },
        container: {
            center: true,
            padding: {
                "DEFAULT": "1rem",
                "sm": "2rem",
                "md": "3rem",
                "lg": "4rem",
                "xl": "5rem",
                "2xl": "6rem",
            },
        },
    },
    plugins: [],
};
