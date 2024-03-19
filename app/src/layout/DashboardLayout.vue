<template>
  <div class="wrapper">
    <side-bar>
      <sidebar-link to="/overview">
        <i class="nc-icon nc-chart-pie-35"></i>
        <p>แดชบอร์ด</p>
      </sidebar-link>
      <sidebar-link to="/list">
        <i class="nc-icon nc-notes"></i>
        <p>ข้อมูลจัดซื้อ - จัดจ้าง</p>
      </sidebar-link>
      <sidebar-link to="/creditor">
        <i class="nc-icon nc-settings-90"></i>
        <p>ตั้งค่าข้อมูลระบบ</p>
      </sidebar-link>
      <sidebar-link to="/dataset">
        <i class="nc-icon nc-bullet-list-67"></i>
        <p>ประเภทหนี้</p>
      </sidebar-link>
    </side-bar>
    <div class="main-panel">
      <top-navbar></top-navbar>
      <dashboard-content @click="toggleSidebar"></dashboard-content>
      <content-footer></content-footer>
    </div>
  </div>
</template>
<style lang="scss">

</style>
<script>
  import TopNavbar from './TopNavbar.vue'
  import ContentFooter from './ContentFooter.vue'
  import DashboardContent from './Content.vue'
  import MobileMenu from './MobileMenu.vue'
  export default {
    components: {
      TopNavbar,
      ContentFooter,
      DashboardContent,
      MobileMenu
    },
    methods: {
      toggleSidebar () {
        if (this.$sidebar.showSidebar) {
          this.$sidebar.displaySidebar(false)
        }
      }
    }
  }

</script>
