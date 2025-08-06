/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "border1":"#F0F0F0",
        "border2":"#F0F0F0",
        "brand_color":"#F84D42",
        "title":"#343434",
        "title2":"#727272"
      },
      fontSize:{
            "heading1":"40px",
            "heading":"30px",
      },
      fontFamily: {
       "poppins":["Poppins","serif"],
       "roboto":["Roboto","sans-serif"],
       "jost":["Jost","sans-serif"],
       "baji":["Bai Jamjuree","serif"]
      },
      boxShadow:{
        "shadow1":"3px 3px 6px 0 #00000014"
      },
      // -------------------animation-------------------
      animation: {
        'slide-in': 'slide-in 1s ease-in-out forwards',
        'zoom-in': 'zoom-in 1s ease-in-out forwards',
        'move-slowly': 'move-slowly 10s infinite',
        'cloud-left': 'cloud-left 3s forwards',
        'cloud-right': 'cloud-right 3s forwards',
        'up-down': 'upDown 2s infinite ease-in-out',
        'side-to-side': 'sideToSide 3s infinite ease-in-out',
        'rotate': 'rotate 5s linear infinite',
        'diagonal': 'diagonal 4s infinite ease-in-out',
        'bounce-custom': 'bounce-custom 1s infinite',
        'shake': 'shake 0.7s ease-in-out infinite',
        zoom: 'zoom 2s ease-in-out infinite',
        scaleLoop: "scaleLoop 3s infinite ease-in-out",
      },
      keyframes: {
        scaleLoop: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.05)" },
        },
        zoom: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.1)' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-2px)' },
          '50%': { transform: 'translateX(2px)' },
          '75%': { transform: 'translateX(-2px)' },
        },
        upDown: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'bounce-custom': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        sideToSide: {
          '0%, 100%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(20px)' },
        },
        rotate: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        diagonal: {
          '0%': { transform: 'translate(0, 0)' },
          '50%': { transform: 'translate(20px, 20px)' },
          '100%': { transform: 'translate(0, 0)' },
        },
        'slide-in': {
          '0%': {
            transform: 'translateX(100%)', // Start off-screen to the right
            opacity: '0',
          },
          '100%': {
            transform: 'translateX(0)',
            opacity: '1',
          },
        },
        'cloud-left': {
          '0%': {
            opacity: '0',
            transform: 'translateY(-50%) translateX(0)',
          },
          '50%': {
            opacity: '1',
            transform: 'translateY(-50%) translateX(50px)',
          },
          '100%': {
            opacity: '0',
            transform: 'translateY(-50%) translateX(100px)',
          },
        },
      'cloud-left': {
          '0%': {
            opacity: '0',
            transform: 'translateY(-50%) translateX(0)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(-50%) translateX(50px)',
          },
        },
        'cloud-right': {
          '0%': {
            opacity: '0',
            transform: 'translateY(-50%) translateX(0)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(-50%) translateX(-50px)',
          },
        },
        'move-slowly': {
          '0%': { transform: 'translate(0, 0)' },
          '50%': { transform: 'translate(2px, 2px)' }, // Adjust movement
          '100%': { transform: 'translate(0, 0)' },
        },
        'zoom-in': {
          '0%': {
            transform: 'scale(0.8)', // Start smaller
            opacity: '0',
          },
          '100%': {
            transform: 'scale(1)', // Zoom to full size
            opacity: '1',
          },
          'move-slowly': {
            '0%': { transform: 'translate(0, 0)' },
            '50%': { transform: 'translate(10px, 10px)' }, // Increase movement distance
            '100%': { transform: 'translate(0, 0)' },
          },
        },
        
      }
      // -------------------animation-------------------
    },
  },
  plugins: [],
}