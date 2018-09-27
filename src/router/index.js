import Vue from 'vue'
import VueRouter from 'vue-router'

import Upload from '@/views/Upload'
import Uploaded from '@/views/Uploaded'
import Setting from '@/views/Setting'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    { path: '/', name: 'upload', component: Upload },
    { path: '/uploaded', name: 'uploaded', component: Uploaded },
    { path: '/setting', name: 'setting', component: Setting }
  ]
})
