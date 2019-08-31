import Vue from 'vue'
import Router from 'vue-router'
import Service from '@/views/service/service.vue'
import ArrangeMaster from '@/components/ArrangeMaster.vue'
import Available from '@/components/Available.vue'
import ManageTenant from '@/components/ManageTenant.vue'
import ManageContract from '@/components/ManageContract.vue'
import ReplyComplaint from '@/components/ReplyComplaint.vue'
import VueResource from 'vue-resource'
import Unprocessed from '@/components/Unprocessed.vue'
import Processed from '@/components/Processed.vue'
import Detail from '@/views/detail/detail.vue'
Vue.use(Router)
Vue.use(VueResource)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Service',
      component: Service,
      children: [
        {
          path: '/arrangeMaster',
          name: 'ArrangeMaster',
          component: ArrangeMaster
        },
        {
          path: '/available',
          name: 'Available',
          component: Available
        },
        {
          path: '/manageTenant',
          name: 'ManageTenant',
          component: ManageTenant
        },
        {
          path: '/manageContract',
          name: 'ManageContract',
          component: ManageContract
        },
        {
          path: '/replyComplaint',
          name: 'ReplyComplaint',
          component: ReplyComplaint
        },
        {
          path: '/processed',
          name: 'Processed',
          component: Processed
        },
        {
          path: '/unprocessed',
          name: 'Unprocessed',
          component: Unprocessed
        }
      ]
    },
    {
      path: '/detail/:id',
      name: 'Detail',
      component: Detail
    }
  ]
})
