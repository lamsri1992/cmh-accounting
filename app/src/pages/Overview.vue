<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-xl-4 col-md-12">
          <stats-card>
            <div slot="header" class="icon-primary">
              <i class="nc-icon nc-bullet-list-67 text-primary"></i>
            </div>
            <div slot="content">
              <p class="card-category">ยอดเจ้าหนี้ทั้งหมด</p>
              <h4 class="card-title">{{ total }} บาท</h4>
            </div>
          </stats-card>
        </div>

        <div class="col-xl-4 col-md-12">
          <stats-card>
            <div slot="header" class="icon-info">
              <i class="nc-icon nc-check-2 text-success"></i>
            </div>
            <div slot="content">
              <p class="card-category">หนี้ที่ชำระแล้ว</p>
              <h4 class="card-title">{{ paid }} บาท</h4>
            </div>
          </stats-card>
        </div>

        <div class="col-xl-4 col-md-12">
          <stats-card>
            <div slot="header" class="icon-danger">
              <i class="nc-icon nc-single-copy-04 text-danger"></i>
            </div>
            <div slot="content">
              <p class="card-category">หนี้ที่ค้างชำระ</p>
              <h4 class="card-title">{{ wait }} บาท</h4>
            </div>
          </stats-card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import axios from 'axios'
  import StatsCard from 'src/components/Cards/StatsCard.vue'

  export default {
    components: {
      StatsCard
    },
    data() {
      return {
        total: '',
        wait: '',
        paid: '',
      };
    },
    mounted() {
      axios.get('http://localhost:3000/dashboard')
        .then(response => {
          this.data = response.data;
          this.total = new Intl.NumberFormat().format(response.data[0].total);
          this.wait = new Intl.NumberFormat().format(response.data[0].wait);
          this.paid = new Intl.NumberFormat().format(response.data[0].paid);
      })
    }
  };

</script>
<style>

</style>
