/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./*.html",
        "./js/**/*.js"
    ],
    theme: {
        extend: {
            colors: {
                primary: 'var(--c-text-primary)',
                secondary: 'var(--c-text-secondary)',
                accent: {
                    DEFAULT: 'var(--c-accent)',
                    hover: 'var(--c-accent-hover)',
                    light: 'var(--c-accent-light)',
                },
                muted: 'var(--c-text-muted)',
                surface: {
                    DEFAULT: 'var(--c-bg-primary)',
                    alt: 'var(--c-bg-secondary)',
                },
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
