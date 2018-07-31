import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/less/style.less'

import Vue from 'vue'
import ElementUI from 'element-ui'
import App from '@/components/App.vue'
import store from '@/store'

Vue.config.productionTip = false

Vue.use(ElementUI)

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
