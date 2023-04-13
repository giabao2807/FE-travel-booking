import '@mdi/font/css/materialdesignicons.css'
import { createVuetify, ThemeDefinition } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import 'vuetify/dist/vuetify.min.css'
import * as labs from 'vuetify/labs/components'
import 'vuetify/styles'

const myCustomLightTheme: ThemeDefinition = {
  dark: false,
  colors: {
    background: '#ffccff',
    surface: '#f9f5fa',
    primary: '#ffccff',
    'primary-darken-1': '#EF74D0',
    secondary: '#03DAC6',
    'secondary-darken-1': '#018786',
    error: '#B00020',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FB8C00'
  }
}

export const vuetify = createVuetify({
  directives,
  components: {
    ...components,
    ...labs
  },
  theme: {
    defaultTheme: 'myCustomLightTheme',
    themes: {
      myCustomLightTheme
    }
  }
})
