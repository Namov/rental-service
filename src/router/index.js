import Vue from 'vue'
import Router from 'vue-router'
import Service from '@/views/service/service.vue'
import ArrangeMaster from '@/components/ArrangeMaster.vue'
import Available from '@/components/Available.vue'
import Unavailable from '@/components/Unavailable.vue'
import ManageTenant from '@/components/ManageTenant.vue'
import ManageContract from '@/components/ManageContract.vue'
import ReplyComplaint from '@/components/ReplyComplaint.vue'
import Processed from '@/components/ProcessedLong.vue'
import Unprocessed from '@/components/UnprocessedLong.vue'
import VueResource from 'vue-resource'
import ProcessedLong from "../components/ProcessedLong"
import ProcessedShort from "../components/ProcessedShort"
import UnprocessedLong from "../components/UnprocessedLong"
import UnprocessedShort from "../components/UnprocessedShort";

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
          path: '/unavailable',
          name: 'Unavailable',
          component: Unavailable
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
          path: '/processedLong',
          name: 'ProcessedLong',
          component: ProcessedLong
        },
        {
          path: '/unprocessedLong',
          name: 'UnprocessedLong',
          component: UnprocessedLong
        },
        {
          path: '/processedShort',
          name: 'ProcessedShort',
          component: ProcessedShort
        },
        {
          path: '/unprocessedShort',
          name: 'UnprocessedShort',
          component: UnprocessedShort
        }
      ]
    }
  ]
})
