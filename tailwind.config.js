module.exports = {
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
  },
  purge: {enabled: true, content: [
    'src/**/*.ts',
    'src/**/*.tsx' ,
  ]},
  theme: {
    fontFamily: {
      "sans": ["ff-dagny-web-pro", "sans-serif"],
      "display": ["ff-dagny-web-pro", "sans-serif"],
      "body": ["ff-dagny-web-pro", "sans-serif"]
    },
    extend: {},
  },
  variants: {
    fontWeight: ["responsive", "hover", "focus", "active", "group-hover"]
  },
  plugins: [],
}
