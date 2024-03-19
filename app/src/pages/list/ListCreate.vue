<template>
  <div class="content">
    <div class="container-fluid">
      <div class="card">
        <div class="card-body">
          <div style="margin-bottom: 1rem;">
            <div class="row">
              <div class="col-md-12">
                <h5 class="card-title">
                  <i class="nc-icon nc-money-coins"></i>
                  <a href="#/list"> ข้อมูลจัดซื้อ - จัดจ้าง</a> / 
                  <span class="text-muted">{{ this.$route.name }}</span>
                </h5>
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
                v-model="create.year">
              </div>
              <div class="col-md-6">
                <label for="">
                  <i class="fa-regular fa-calendar"></i>
                  วันที่รับสินค้า
                </label>
                  <vc-date-picker v-model="create.datein" mode="date" locale="th" :masks="masks">
                  <template v-slot="{ inputValue, inputEvents }">
                    <input
                      class="form-control focus:outline-none focus:border-blue-300"
                      :value="inputValue"
                      v-on="inputEvents"
                      readonly
                    />
                  </template>
                </vc-date-picker>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6">
                <label for="">
                  <i class="fa-regular fa-clipboard"></i>
                  ทะเบียนใบสั่งซื้อ - สั่งจ้าง
                </label>
                <input type="text" class="form-control"
                v-model="create.docno">
              </div>
              <div class="col-md-6">
                <label for="">
                  <i class="fa-solid fa-comment-dollar"></i>
                  ยอดการสั่งซื้อ
                </label>
                <input type="text" class="form-control"
                v-model="create.total">
              </div>
            </div>
            <div class="row">
              <div class="col-md-6">
                <label for="">
                  <i class="fa-solid fa-folder-open"></i>
                  ประเภทหนี้
                </label>
                <select id="sel_ptype" class="basic-select2" >
                  <option></option>
                  <option v-for="(value, key) in ptypes" :key="key" 
                    v-bind:value="{ id: value.type_id, text: value.type_name }" :value="value.type_id">
                    {{ value.type_code + " : " + value.type_name }}
                  </option>
                </select>
              </div>
              <div class="col-md-6">
                <label for="">
                  <i class="fa-solid fa-folder-tree"></i>
                  ประเภทบัญชี
                </label>
                <select id="sel_sub" class="basic-select2">
                  <option></option>
                  <option v-for="(value, key) in subtype" :key="key" 
                    v-bind:value="{ id: value.sub_id, text: value.sub_name }" :value="value.sub_id">
                    {{ value.sub_code + " : " + value.sub_name }}
                  </option>
                </select>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12">
                <label for="">
                  <i class="fa-regular fa-building"></i>                
                  บริษัทเจ้าหนี้
                </label>
                <select id="sel_creditor" class="basic-select2">
                  <option></option>
                  <option v-for="(value, key) in creditors" :key="key" 
                    v-bind:value="{ id: value.creditor_id, text: value.creditor_name }" :value="value.creditor_id">
                    {{ value.creditor_name }}
                  </option>
                </select>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12">
                <label for="">
                  <i class="fa-regular fa-edit"></i>
                  รายการ / หมายเหตุ
                </label>
                <input type="text" class="form-control"
                v-model="create.note">
              </div>
            </div>
            <div class="row">
              <div class="col-md-6">
                <label for="">
                  <i class="fa-solid fa-dolly"></i>
                  เลขที่ใบส่งของ
                </label>
                <input type="text" class="form-control"
                v-model="create.docitem">
              </div>
              <div class="col-md-6">
                <label for="">
                  <i class="fa-regular fa-calendar-xmark"></i>
                  กำหนดครบชำระ
                </label>
                <input type="text" class="form-control"
                v-model="create.datedue">
              </div>
            </div>
            <div class="row">
              <div class="col-md-12">
                <label for="">
                  <i class="fa-solid fa-upload"></i>
                  เอกสารแนบ
                </label>
                <input type="file" class="form-control-file"
                  @change="onFileChange">
                <small class="text-muted">
                  <i class="fa-regular fa-file-pdf text-danger"></i>
                  รองรับไฟล์ประเภท .pdf เท่านั้น
                </small>
              </div>
            </div>
            <div class="row text-right">
              <div class="col-md-12">
                <button class="btn btn-success btn-fill"
                  @click.prevent="saveClick">
                  <i class="fa-solid fa-save"></i>
                  บันทึกรายการใหม่
                </button>
              </div>
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
        ptypes: [],
        creditors: [],
        subtype: [],
        create: {
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
          docfiles: '',
        },
        masks: {
          input: 'YYYY-MM-DD',
        },
      }
    },
    mounted(){
      $('.basic-select2').select2({
        width: '100%',
        placeholder: 'กรุณาเลือกข้อมูล',
      });

      axios.get('http://localhost:3000/acc_type')
        .then(response => {
        this.ptypes = response.data;
      })

      axios.get('http://localhost:3000/creditors')
        .then(response => {
        this.creditors = response.data;
      })
      
      axios.get('http://localhost:3000/sub_type/')
        .then(response => {
        this.subtype = response.data;
      })
    },
    methods: {
      onFileChange(e) {
        const selectedFile = e.target.files[0];
        this.selectedFile = selectedFile;
        this.create.docfiles = selectedFile.name;
      },
      saveClick () {
        var sel_ptype = document.getElementById('sel_ptype').value;
        var sel_creditor = document.getElementById('sel_creditor').value;
        var sel_sub = document.getElementById('sel_sub').value;

        this.create.iptype = sel_ptype;
        this.create.icreditor = sel_creditor;
        this.create.isubtype = sel_sub;
        
        if(this.create.year === '' || this.create.datein === '' || this.create.docno === '' || this.create.total === ''
        || this.create.iptype === '' || this.create.icreditor === ''|| this.create.note === ''|| this.create.docitem === ''
        || this.create.datedue === '' || this.create.isubtype === ''){
          Swal.fire({
            icon: 'error',
            title: "Invalid Data",
            text: "กรุณากรอกข้อมูลให้ครบถ้วน",
            showCancelButton: false,
            width: '50%'
          })
        }else{
          Swal.fire({
              title: "ยืนยันบันทึกรายการใหม่ ?",
              showDenyButton: true,
              confirmButtonText: "บันทึกข้อมูล",
              denyButtonText: "ยกเลิก"
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
                  icon: "success",
                  title: "บันทึกรายการสำเร็จ"
                });
                const formData = new FormData();
                formData.append("file", this.selectedFile);
                formData.append("year", this.create.year);
                formData.append("datein", moment(this.create.datein).format("YYYY-MM-DD"));
                formData.append("docno", this.create.docno);
                formData.append("total", this.create.total);
                formData.append("iptype", this.create.iptype);
                formData.append("isubtype", this.create.isubtype);
                formData.append("icreditor", this.create.icreditor);
                formData.append("note", this.create.note);
                formData.append("docitem", this.create.docitem);
                formData.append("datedue", this.create.datedue);

                this.axios.post('http://localhost:3000/create',formData)
                window.location.href = '#/list';
              }
          });
        }
      },
    }
  }

</script>
<style>

</style>
