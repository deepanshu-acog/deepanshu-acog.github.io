/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#0f0f10',
        page: '#121214',
        card: '#18191c',
        raised: '#222327',
        border: 'rgba(237, 237, 237, 0.08)',
        accent: {
          cyan: '#00e5ff',
          emerald: '#4cc38a',
          amber: '#f59e0b',
          rose: '#e5484d',
        },
        text: {
          primary: '#ededed',
          secondary: '#a1a1a6',
          muted: '#85858b',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        'subtle': '0 1px 2px rgba(0, 0, 0, 0.4)',
        'raised': '0 4px 16px -2px rgba(0, 0, 0, 0.5)',
        'inset-hairline': 'inset 0 1px 0 rgba(255, 255, 255, 0.08)',
      }
    },
  },
  plugins: [],
}
