import DashboardLayout from '../layout/DashboardLayout.vue'
import NotFound from '../pages/NotFoundPage.vue'
import Overview from 'src/pages/Overview.vue'
import List from 'src/pages/list/List.vue'
import ListCreate from 'src/pages/list/ListCreate.vue'
import ListView from 'src/pages/list/ListView.vue'
import Creditor from 'src/pages/config/Creditor.vue'
import Dataset from 'src/pages/dataset/Dataset.vue'
import SubDataset from 'src/pages/dataset/SubDataset.vue'

const routes = [
  {
    path: '/',
    component: DashboardLayout,
    redirect: '/overview',
    children: [
      {
        path: 'overview',
        name: 'แดชบอร์ด',
        component: Overview
      },
      {
        path: 'list',
        name: 'ข้อมูลจัดซื้อ - จัดจ้าง',
        component: List
      },
      {
        path: 'list/create',
        name: 'เพิ่มรายการใหม่',
        component: ListCreate
      },
      {
        path: 'list/:id',
        name: 'รายการหนี้',
        component: ListView,
        params: true
      },
      {
        path: 'creditor',
        name: 'ตั้งค่าข้อมูลพื้นฐาน',
        component: Creditor
      },
      {
        path: 'dataset',
        name: 'Dataset ประเภทหนี้',
        component: Dataset
      },
      {
        path: 'dataset/:id',
        name: 'Dataset ประเภทหนี้ / บัญชีเจ้าหนี้',
        component: SubDataset,
        params: true
      },
    ]
  },
  { path: '*', component: NotFound }
]

/**
 * Asynchronously load view (Webpack Lazy loading compatible)
 * The specified component must be inside the Views folder
 * @param  {string} name  the filename (basename) of the view to load.
function view(name) {
   var res= require('../components/Dashboard/Views/' + name + '.vue');
   return res;
};**/

export default routes
