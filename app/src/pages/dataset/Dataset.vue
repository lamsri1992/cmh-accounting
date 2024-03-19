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
                <table id="tableBasic" class="table-hover table-borderless table-bordered" width="100%">
                  <thead>
                    <tr>
                      <td class="text-center">_ID</td>
                      <td>รหัสบัญชี</td>
                      <td>ประเภทหนี้</td>
                    </tr>
                  </thead>
                  <tbody></tbody>
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
    mounted(){
      $('#tableBasic').dataTable({
        ajax: {
            url: "http://localhost:3000/acc_type",
            dataSrc: ""
        },
        columns: [
            { 'data': 'type_id', className: 'text-center' },
            { 'data': 'type_code', className: 'text-left' },
            { 'data': 'type_name', className: 'text-left' },
          ],
        lengthMenu: [
            [15, 50, 100, -1],
            [15, 50, 100, "All"]
        ],
        scrollX: true,
        oLanguage: {
                 oPaginate: {
                    sFirst: '<small>หน้าแรก</small>',
                    sLast: '<small>หน้าสุดท้าย</small>',
                    sNext: '<small>ถัดไป</small>',
                    sPrevious: '<small>กลับ</small>'
                },
                sInfo: "<small>ทั้งหมด _TOTAL_ รายการ</small>",
                sLengthMenu: "<small>แสดง _MENU_ รายการ</small>",
                sSearch: "<i class='fa fa-search'></i> ค้นหา : ",
          },
      });

      var table = $('#tableBasic').DataTable();
        table.on('click', 'tr', function () {
          var obj = table.row(this).data();
          var id = obj[Object.keys(obj)[0]];
          var url = '#/dataset/' + id;
          window.location.href = url;
        });
      }
    }
</script>
<style>

</style>
