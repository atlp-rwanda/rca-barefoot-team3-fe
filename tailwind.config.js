module.exports = {
  purge: {
    enabled: true,
    content: ["./src/**/*.{js,jsx,ts,tsx}",'./src/**/*.html'],
    // ...
  },
  theme: {
    extend: {
  colors: {
    'orange': {
      light: '#FFEADF',
      DEFAULT: '#E66B31',
      dark: '#E66B31'
      
    },
    'grey':{
      light:'#F5F5F5',
      dark:'#424242'
    },
    red:'#FF0000',
    green:'#008000'

 }}}

};

