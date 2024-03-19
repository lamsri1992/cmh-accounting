<template>
  <div class="content">
    <div class="container-fluid">
      <div class="card">
        <div class="card-body">
          <div style="margin-bottom: 1rem;">
            <div class="row">
              <div class="col-md-12">
                <h5 class="card-title">
                  <i class="nc-icon nc-bullet-list-67"></i>
                  {{ this.$route.name }}
                </h5>
              </div>
              <div class="card-body">
                <table class="table table-striped table-borderless table-bordered">
                  <thead>
                      <tr>
                          <th>รหัสบัญชีเจ้าหนี้</th>
                          <th>ชื่อบัญชีเจ้าหนี้</th>
                      </tr>
                  </thead>
                  <tbody>
                      <tr v-for="item in items" :key="items.sub_code">
                          <td>{{item.sub_code}}</td>
                          <td>{{item.sub_name}}</td>
                      </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>  
  import axios from 'axios'

  export default {
    data() {
      return{
        items: []
      }
    },
    mounted(){
      const url = window.location.href;
      const id = url.split("/").slice(-1)[0];
        axios.get('http://localhost:3000/sub_acc_type/' + id)
            .then(response => {
              this.items = response.data
            })
        }
    }
</script>
<style>

</style>
