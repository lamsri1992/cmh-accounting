<template>
  <div class="content">
    <div class="container-fluid">
      <div class="card">
        <div class="card-body">
          <div style="margin-bottom: 1rem;">
            <div class="row">
              <div class="col-md-12">
                <h5 class="card-title">
                  <i class="nc-icon nc-settings-90"></i>
                  {{ this.$route.name }}
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>  
  import Card from 'src/components/Cards/Card.vue'

  export default {
    components: {
      Card
    },
    data () {
      return {

      }
    },
    mounted(){
      $('#tableBasic').dataTable();
    }
  }

</script>
<style>

</style>
