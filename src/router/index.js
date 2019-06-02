import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index'
import Predict from '@/components/predict'
import Information from '@/components/information'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/index',
      name: 'index',
      component: Index,
    }, {
      path: '/predict',
      name: 'predict',
      component: Predict,
    }, {
      path: '/information',
      name: 'information',
      component: Information
    }
  ]
})
