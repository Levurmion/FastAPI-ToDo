import type { Config } from "tailwindcss";
import { SafelistConfig } from "tailwindcss/types/config";

const colors = ['primary', 'secondary', 'info', 'success', 'warning', 'danger', 'asphalt'];
const elements = ['text', 'shadow', 'bg', 'border']
const shades = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'];
const variants = ['', 'sm:', 'md:', 'lg:', 'xl:', '2xl:', 'hover:', 'focus:', 'active:'];

const safelist = colors.flatMap(color =>
  shades.flatMap(shade =>
    variants.flatMap(variant => {
        return elements.map(element => `${variant}${element}-${color}-${shade}`)
    })
  )
);


const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/lib/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
            colors: {
                'asphalt': {
                    '50': '#dfdfdd',
                    '100': '#cfcdc9',
                    '200': '#b4b1ac',
                    '300': '#969188',
                    '400': '#78746d',
                    '500': '#67645f',
                    '600': '#56524e',
                    '700': '#423f3d',
                    '800': '#363636',
                    '900': '#2d2e2e',
                    '950': '#16100e',
                },
                'primary': {
                    '50': '#f2f5fc',
                    '100': '#e2e9f7',
                    '200': '#cbd7f2',
                    '300': '#a8bfe8',
                    '400': '#7e9ddc',
                    '500': '#607ed1',
                    '600': '#4c64c4',
                    '700': '#4253b3',
                    '800': '#3b4592',
                    '900': '#2c3464',
                    '950': '#232848',
                },
                'secondary': {
                    '50': '#fef6ee',
                    '100': '#fcebd8',
                    '200': '#f9d2af',
                    '300': '#f4b37d',
                    '400': '#ef8848',
                    '500': '#eb6924',
                    '600': '#dc501a',
                    '700': '#ab3816',
                    '800': '#91311b',
                    '900': '#752a19',
                    '950': '#3f130b',
                },
                'success': {
                    DEFAULT: '#079a59',
                    '50': '#ecfdf3',
                    '100': '#d1fae0',
                    '200': '#a8f2c6',
                    '300': '#6fe6a7',
                    '400': '#36d184',
                    '500': '#12b76a',
                    '600': '#079a59',
                    '700': '#057747',
                    '800': '#075e3b',
                    '900': '#074d32',
                    '950': '#032b1d',
                },
                'warning': {
                    DEFAULT: '#ddc808',
                    '50': '#fafdc9',
                    '100': '#f9fea5',
                    '200': '#fbfe6d',
                    '300': '#fdf92b',
                    '400': '#ebdc05',
                    '500': '#ddc808',
                    '600': '#cca600',
                    '700': '#a47800',
                    '800': '#885d07',
                    '900': '#744c0b',
                    '950': '#402503',
                },
                'danger': {
                    DEFAULT: '#ec1b03',
                    '50': '#fff2f0',
                    '100': '#ffe1dd',
                    '200': '#ffc7c1',
                    '300': '#ffa196',
                    '400': '#ff6a59',
                    '500': '#ff3c26',
                    '600': '#ec1b03',
                    '700': '#d41701',
                    '800': '#af1705',
                    '900': '#901a0c',
                    '950': '#4f0800',
                },
            },
        },
    },
    plugins: [],
    safelist: safelist
};
export default config;
