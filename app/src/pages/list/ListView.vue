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
                  <a href="#/list"> ข้อมูลเจ้าหนี้</a> / 
                  <span class="text-muted">{{ this.$route.name }}</span>&nbsp;
                  <small>
                    <i class="fa-regular fa-calendar-plus"></i>
                    วันที่สร้างรายการ
                    {{ view.createDate }}
                  </small>
                </h5>
              </div>
              <div class="col-md-6 text-right">
                <span :class="view.text" style="font-size: 14px;">
                  {{ view.status }}
                </span>
              </div>
            </div>
          </div>
          <form>
            <div class="row">
              <div class="col-md-6">
                <label for="">
                  <i class="fa-regular fa-calendar-check"></i>
                  ปีงบประมาณ
                </label>
                <input type="text" class="form-control"
                v-model="view.year">
              </div>
              <div class="col-md-6">
                <label for="">
                  <i class="fa-regular fa-calendar"></i>
                  วันที่รับสินค้า
                </label>
                <input type="text" class="form-control"
                v-model="view.datein">
              </div>
            </div>
            <div class="row">
              <div class="col-md-6">
                <label for="">
                  <i class="fa-regular fa-clipboard"></i>
                  ทะเบียนใบสั่งซื้อ - สั่งจ้าง
                </label>
                <input type="text" class="form-control"
                v-model="view.docno">
              </div>
              <div class="col-md-6">
                <label for="">
                  <i class="fa-solid fa-comment-dollar"></i>
                  ยอดการสั่งซื้อ
                </label>
                <input type="text" class="form-control"
                v-model="view.total">
              </div>
            </div>
            <div class="row">
              <div class="col-md-6">
                <label for="">
                  <i class="fa-solid fa-folder-open"></i>
                  ประเภทหนี้
                </label>
                <input type="text" class="form-control"
                v-model="view.iptype">
              </div>
              <div class="col-md-6">
                <label for="">
                  <i class="fa-solid fa-folder-tree"></i>
                  ประเภทบัญชี
                </label>
                <input type="text" class="form-control"
                v-model="view.isubtype">
              </div>
            </div>
            <div class="row">
              <div class="col-md-12">
                <label for="">
                  <i class="fa-regular fa-building"></i>                
                  บริษัทเจ้าหนี้
                </label>
                <input type="text" class="form-control"
                v-model="view.icreditor">
              </div>
            </div>
            <div class="row">
              <div class="col-md-12">
                <label for="">
                  <i class="fa-regular fa-edit"></i>
                  รายการ / หมายเหตุ
                </label>
                <input type="text" class="form-control"
                v-model="view.note">
              </div>
            </div>
            <div class="row">
              <div class="col-md-6">
                <label for="">
                  <i class="fa-solid fa-dolly"></i>
                  เลขที่ใบส่งของ
                </label>
                <input type="text" class="form-control"
                v-model="view.docitem">
              </div>
              <div class="col-md-6">
                <label for="">
                  <i class="fa-regular fa-calendar-xmark"></i>
                  กำหนดครบชำระ
                </label>
                <input type="text" class="form-control"
                v-model="view.datedue">
              </div>
            </div>
            <div class="row">
              <div class="col-md-12">
                <label for="">
                  <i class="fa-regular fa-file-pdf text-danger"></i>
                  ไฟล์เอกสาร
                </label><br>
                <a :href="view.url" target="_blank">
                  {{ view.ifile }}
                </a>
              </div>
            </div>
            <div class="row text-right" v-if="view.statusID == 1">
              <div class="col-md-12">
                <button class="btn btn-warning btn-fill"
                  @click.prevent="cancelClick">
                  <i class="fa-solid fa-xmark-circle"></i>
                  ยกเลิกรายการ
                </button>
              </div>
            </div>
            <div v-if="view.statusID == 4" style="margin-top: 0.6rem;color: red;" class="text-center">
              <b>รายการถูกยกเลิก</b><br>
              <span><i class="fa-regular fa-calendar"></i> {{ view.dateCancel }}</span>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>  
  import axios from 'axios'
  import Card from 'src/components/Cards/Card.vue'

  export default {
    components: {
      Card
    },
    data () {
      return {
        view: {
          year: '',
          datein: '',
          docno: '',
          total: '',
          iptype: '',
          isubtype: '',
          icreditor: '',
          note: '',
          docitem: '',
          datedue: '',
          ifile: '',
          url: '',
          dateCancel: '',
          createDate: '',
        },
        masks: {
          input: 'YYYY-MM-DD',
        },
      }
    },
    mounted(){
      const url = window.location.href;
      const id = url.split("/").slice(-1)[0];
      axios.get('http://localhost:3000/list/' + id)
        .then(response => {
          this.data = response.data;
          this.view.year = response.data[0].list_year;
          this.view.datein = moment(response.data[0].list_date_in).format("DD/MM/YYYY");
          this.view.docno = response.data[0].list_doc_no;
          this.view.total = new Intl.NumberFormat().format(response.data[0].list_total);
          this.view.icreditor = response.data[0].creditor_name;
          this.view.iptype = response.data[0].type_name;
          this.view.isubtype = response.data[0].sub_name;
          this.view.note = response.data[0].list_note;
          this.view.docitem = response.data[0].list_doc_item;
          this.view.datedue = response.data[0].list_datedue;
          this.view.status = response.data[0].status_name;
          this.view.text = response.data[0].status_color;
          this.view.statusID = response.data[0].status_id;
          this.view.dateCancel = moment(response.data[0].list_cancel_date).format("DD/MM/YYYY");
          this.view.createDate = moment(response.data[0].list_create_date).format("DD/MM/YYYY");
          this.view.ifile = response.data[0].list_file;
          this.view.url = 'http://localhost:3000/files/DocFiles/' + this.view.ifile;
      })
    },
    methods:{
      cancelClick(){
        Swal.fire({
              icon: 'warning',
              title: "ยืนยันยกเลิกรายการ ?",
              text: "เลขที่ใบสั่งซื้อ : " + this.view.docno,
              showDenyButton: true,
              confirmButtonText: "ยืนยัน",
              denyButtonText: "ยกเลิก",
            }).then((result) => {
            if (result.isConfirmed) {
                const Toast = Swal.mixin({
                  toast: true,
                  position: "top-end",
                  showConfirmButton: false,
                  timer: 3000,
                  timerProgressBar: true,
                  didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                  }
                });
                Toast.fire({
                  icon: "error",
                  title: "ยกเลิกรายการหนี้สำเร็จ",
                  text: "เลขที่ใบสั่งซื้อ : " + this.view.docno,
                });
                
                const url = window.location.href;
                const id = url.split("/").slice(-1)[0];
                this.axios.post('http://localhost:3000/list/update/' + id)
                window.location.href = '#/list';
              }
          });
      }
    }
  }

</script>
<style>

</style>
