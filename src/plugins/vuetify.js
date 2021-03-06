import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import 'vuetify/src/stylus/app.styl'
import colors from 'vuetify/es5/util/colors'

// Translation provided by Vuetify (javascript)
import zhHans from 'vuetify/es5/locale/zh-Hans'

Vue.use(Vuetify, {
  iconfont: 'md',
  theme: {
    primary: colors.green.darken4,
    secondary: colors.green.darken1,
    accent: colors.green.lighten2
  },
  lang: {
    locales: { zhHans},
    current: 'zhHans'
  },
});
