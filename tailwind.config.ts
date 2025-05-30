import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
      fontFamily: {
        sans: 'var(--font-fam)',
      },
      spacing: {
        sm: '8px',
        med: '12px',
        lg: '18px',
        xl: '20px',
        xxl: '24px',
      },
      maxWidth: {
        mobile: '420px',
        desktop: '1140px',
      }
    },
  },
  plugins: [],
};

export default config;
