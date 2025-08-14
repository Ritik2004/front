/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'pacifico': ['Pacifico', 'cursive'],
        'inter': ['Inter', 'sans-serif'],
      },
      colors: {
        'space-blue': '#0D1B2A',
        'soft-pink': '#FFC0CB',
        'soft-purple': '#D8BFD8',
        'deep-purple': '#6B46C1',
        'star-gold': '#FFD700',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'twinkle': 'twinkle 2s ease-in-out infinite alternate',
        'shooting-star': 'shootingStar 3s linear infinite',
        'fly-across': 'flyAcross 4s ease-in-out',
        'heart-float': 'heartFloat 3s ease-out forwards',
        'firework': 'firework 1s ease-out forwards',
        'scale-in': 'scaleIn 0.5s ease-out',
        'fade-in': 'fadeIn 0.5s ease-out',
        'sparkle-burst': 'sparkleBurst 1s ease-out forwards',
        'rainbow-glow': 'rainbowGlow 2s ease-in-out infinite',
        'bounce-in': 'bounceIn 0.6s ease-out',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        twinkle: {
          '0%': { opacity: '0.3', transform: 'scale(1)' },
          '100%': { opacity: '1', transform: 'scale(1.2)' },
        },
        shootingStar: {
          '0%': { transform: 'translateX(-100vw) translateY(100vh)', opacity: '0' },
          '10%': { opacity: '1' },
          '90%': { opacity: '1' },
          '100%': { transform: 'translateX(100vw) translateY(-100vh)', opacity: '0' },
        },
        flyAcross: {
          '0%': { transform: 'translateX(-200px) translateY(50px)', opacity: '0' },
          '20%': { opacity: '1' },
          '80%': { opacity: '1' },
          '100%': { transform: 'translateX(calc(100vw + 200px)) translateY(-50px)', opacity: '0' },
        },
        heartFloat: {
          '0%': { transform: 'translateY(100vh) scale(0)', opacity: '0' },
          '10%': { opacity: '1' },
          '90%': { opacity: '1' },
          '100%': { transform: 'translateY(-100vh) scale(1)', opacity: '0' },
        },
        firework: {
          '0%': { transform: 'scale(0)', opacity: '1' },
          '50%': { transform: 'scale(1)', opacity: '1' },
          '100%': { transform: 'scale(1.5)', opacity: '0' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        sparkleBurst: {
          '0%': { transform: 'scale(0) rotate(0deg)', opacity: '1' },
          '50%': { transform: 'scale(1.2) rotate(180deg)', opacity: '0.8' },
          '100%': { transform: 'scale(0) rotate(360deg)', opacity: '0' },
        },
        rainbowGlow: {
          '0%': { boxShadow: '0 0 20px #FFD700' },
          '25%': { boxShadow: '0 0 25px #FFC0CB' },
          '50%': { boxShadow: '0 0 20px #D8BFD8' },
          '75%': { boxShadow: '0 0 25px #87CEEB' },
          '100%': { boxShadow: '0 0 20px #FFD700' },
        },
        bounceIn: {
          '0%': { transform: 'scale(0.3)', opacity: '0' },
          '50%': { transform: 'scale(1.05)', opacity: '1' },
          '70%': { transform: 'scale(0.9)' },
          '100%': { transform: 'scale(1)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 15px rgba(255, 192, 203, 0.4)' },
          '50%': { boxShadow: '0 0 30px rgba(255, 192, 203, 0.8)' },
        },
      },
    },
  },
  plugins: [],
}
