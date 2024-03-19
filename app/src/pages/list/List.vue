<template>
  <div class="content">
    <div class="container-fluid">
      <div class="card">
        <div class="card-body">
          <div style="margin-bottom: 1rem;">
            <div class="row">
              <div class="col-md-6">
                <h5 class="card-title">
                  <i class="nc-icon nc-money-coins"></i>
                  {{ this.$route.name }}
                </h5>
              </div>
              <div class="col-md-6 text-right">
                <div class="btn-group" role="group">
                  <a href="#/list/create" class="btn btn-success btn-fill">
                    <i class="fa-solid fa-plus-circle"></i>
                    เพิ่มรายการใหม่
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div class="row" style="margin-bottom: 1rem;">
            <div class="col-md-6">
              <input id="min" type="text" class="form-control" placeholder="เลือกช่วงวันที่เริ่มจ้น">
            </div>
            <div class="col-md-6">
              <input id="max" type="text" class="form-control" placeholder="เลือกช่วงวันที่สิ้นสุด">
            </div>
          </div>
          <table id="tableBasic" class="table-hover display nowrap" style="width: 100%;">
            <thead>
              <tr>
                <td>วันที่รับสินค้า</td>
                <td>ครบกำหนด</td>
                <td class="text-center">ปีงบ</td>
                <td>ประเภทหนี้</td>
                <td>เจ้าหนี้</td>
                <td>เลขที่ใบสั่งซื้อ</td>
                <td>ยอด</td>
                <td>สถานะ</td>
              </tr>
            </thead>
            <tbody></tbody>
            <tfoot>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tfoot>
          </table>
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
      $('#tableBasic').dataTable({
        scrollX: true,
        ajax: {
            url: "http://localhost:3000/list",
            dataSrc: ""
        },
        columns: [
            { 'data': 'list_date_in',
              render: function(data, type, row){
                return moment(data).format("DD/MM/YYYY");
              }
            },
            { 'data': 'limit_date',
              render: function (data, type, row, meta) {
                return moment(row.list_date_in).add(row.list_datedue,'days').format("DD/MM/YYYY");
              }
            },
            { 'data': 'list_year', className: 'text-center' },
            { 'data': 'type_name' },
            { 'data': 'creditor_name' },
            { 'data': 'list_doc_no' },
            { 'data': 'list_total', 
              render: function(data, type, row){
                return new Intl.NumberFormat().format(data);
              }
            },
            { 'data': 'list_status', className: 'text-center',
              render: function (data, type, row) {
                  if (data === "1") {
                    return '<span style="font-weight:bold;" class="text-danger">รอตอบรับ</span>';
                  }
                  if (data === "2") {
                    return '<span style="font-weight:bold;" class="text-primary">ตอบรับแล้ว</span>';
                  }
                  if (data === "3") {
                    return '<span style="font-weight:bold;" class="text-success">ชำระเสร็จสิ้น</span>';
                  }
                  if (data === "4") {
                    return '<span style="font-weight:bold;" class="text-warning">ยกเลิก</span>';
                  }
              }
            },
        ],
        lengthMenu: [
            [10, 50, 100, -1],
            [10, 50, 100, "All"]
        ],
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
        initComplete: function () {
          this.api()
            .columns([2,3,4])
            .every(function () {
                var column = this;
                var select = $('<select class="custom-select" style="width:100%;"><option value="">All</option></select>')
                    .appendTo($(column.footer()).empty())
                    .on('change', function () {
                        var val = DataTable.util.escapeRegex($(this).val());
                        column
                            .search(val ? '^' + val + '$' : '', true, false)
                            .draw();
                    });
                column
                    .data()
                    .unique()
                    .sort()
                    .each(function (d, j) {
                        select.append(
                            '<option class="custom-select" value="' + d + '">' + d + '</option>'
                        );
                    });
            });
          }
      });
      
      var table = $('#tableBasic').DataTable();
      var minDate, maxDate;

      DataTable.ext.search.push(function (settings, data, dataIndex) {
          var min = minDate.val();
          var max = maxDate.val();
          var date = new Date(data[0]);
      
          if (
              (min === null && max === null) ||
              (min === null && date <= max) ||
              (min <= date && max === null) ||
              (min <= date && date <= max)
          ) {
              return true;
          }
          return false;
      });
      
      // Create date inputs
      minDate = new DateTime('#min', {
          format: 'DD/MM/YYYY'
      });
      maxDate = new DateTime('#max', {
          format: 'DD/MM/YYYY'
      });
      
      // Refilter the table
      $('#min, #max').on('change', function () {
          table.draw();
      });

        table.on('click', 'tr', function () {
          var obj = table.row(this).data();
          var id = obj[Object.keys(obj)[1]];
          var url = '#/list/' + id;
          window.location.href = url;
      });
    }
  }

</script>
<style>

</style>
