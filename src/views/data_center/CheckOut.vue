<template>
  <div>
    <CCard>
      <CCardHeader>
        <strong class="text-primary">ติดต่อเข้าอาคาร</strong>
      </CCardHeader>

      <CCardBody>
        <CRow>
          <CCol>
            <CRow>
              <CCol :md="{ size: '2' }">
                <h6><strong>รหัส</strong></h6>
              </CCol>
              <CCol>
                <h6>
                  {{ checkInContents[0].requestId }}
                </h6>
              </CCol>
            </CRow>
            <CRow>
              <CCol :md="{ size: '2' }">
                <h6><strong>หมายเลขบัตร</strong></h6>
              </CCol>
              <CCol>
                <h6>
                  {{ checkInContents[0].checkInCard }}
                </h6>
              </CCol>
            </CRow>
            <CRow>
              <CCol :md="{ size: '2' }">
                <h6><strong>ผู้ร้องขอ</strong></h6>
              </CCol>
              <CCol>
                <h6>
                  {{ checkInContents[0].requester }}
                </h6>
              </CCol>
            </CRow>
            <CRow>
              <CCol :md="{ size: '2' }">
                <h6><strong>สังกัด</strong></h6>
              </CCol>
              <CCol>
                <h6>
                  {{ checkInContents[0].affiliation }}
                </h6>
              </CCol>
            </CRow>
          </CCol>
          <CCol>
            <CRow>
              <CCol :md="{ size: '2' }">
                <h6><strong>วันที่</strong></h6>
              </CCol>
              <CCol>
                <h6>
                  {{ new Date(checkInContents[0].date).toLocaleDateString('th-TH') }}
                </h6>
              </CCol>
            </CRow>
            <CRow>
              <CCol :md="{ size: '2' }">
                <h6><strong>วันที่ส่งคืน</strong></h6>
              </CCol>
              <CCol>
                <h6>
                  {{ new Date(checkInContents[0].returnDate).toLocaleDateString('th-TH') }}
                </h6>
              </CCol>
            </CRow>
            <CRow>
              <CCol :md="{ size: '2' }">
                <h6><strong>ตำแหน่ง</strong></h6>
              </CCol>
              <CCol>
                <h6>
                  {{ checkInContents[0].position }}
                </h6>
              </CCol>
            </CRow>
            <CRow>
              <CCol :md="{ size: '2' }">
                <h6><strong>วัตถุประสงค์</strong></h6>
              </CCol>
              <CCol>
                <h6>
                  {{ checkInContents[0].purpose }}
                </h6>
              </CCol>
            </CRow>
          </CCol>
        </CRow>
      </CCardBody>
    </CCard>

    <CCard>
      <CCardHeader>
        <strong class="text-primary">รายการ Hardwares</strong>
      </CCardHeader>

      <CCardBody
        ><CDataTable
          :items="hardwareList"
          :fields="[
            { key: 'index', label: '#', _style: 'width:5%' },
            { key: 'name', label: 'Name', _style: 'width:25%' },
            { key: 'brand', label: 'Brand', _style: 'width:10%' },
            {
              key: 'serialNumber',
              label: 'Serial Number',
              _style: 'width:10%',
            },
            { key: 'unit', label: 'Unit', _style: 'width:15%' },
            { key: 'direction', label: 'Direction', _style: 'width:15%' },
            { key: 'type', label: 'Type', _style: 'width:15%' },
          ]"
          :tableFilter="{
            label: 'ค้นหา: ',
            placeholder: 'ค้นหา',
          }"
          pagination
          :items-per-page="5"
          :itemsPerPageSelect="{
            label: 'แสดง',
          }"
        >
          <template #no-items-view
            ><div class="text-center">ไม่พบข้อมูล</div>
          </template>
          <template #index="{ index }">
            <td width="5%">
              {{ index + 1 }}
            </td>
          </template>
        </CDataTable>
        <!-- <CRow>
          <CCol>
            <template>
              <CRow form class="form-group">
                <CCol sm="3"></CCol>
                <CInputRadio
                  v-for="(option, optionKey) in options"
                  :key="optionKey"
                  :label="option.label"
                  :value="option.value"
                  :inline="true"
                  :checked="form.reviewStatus === option.value"
                  @update:checked="() => (form.reviewStatus = option.value)"
                />
              </CRow>
            </template>
          </CCol>
        </CRow> -->
        <!-- <CRow>
          <CCol>
            <CTextarea
              horizontal
              label="ความคิดเห็น"
              rows="4"
              v-model="form.comment"
            />
          </CCol>
        </CRow> -->
      </CCardBody>
      <CCardFooter>
        <CButton
          color="success"
          class="float-right ml-1"
          @click="approvePermission()"
          >อนุมัติ</CButton
        >
        <CButton color="danger" class="float-right ml-1" @click="reject()"
          >ปฎิเสธ</CButton
        >
      </CCardFooter>
    </CCard>
  </div>
</template>

<script>
// import { DatePicker } from "v-calendar";
import axios from "axios";
// import { jogetService } from "@/helpers/joget-helper";
import { authHeader } from "@/helpers/auth-header";
export default {
  components: {
    // "v-date-picker": DatePicker,
    // jogetService,
    // authHeader,
  },
  data() {
    return {
      loadingPage: false,
      checkIn: {
        requester: "",
        position: "",
        affiliation: "",
        idcard: "",
        processId: "",
        processName: "",
        purpose: "",
        date: new Date(),
        returnDate: null,
        checkInCard: "",
      },

      hardware: {
        checkInId: "",
        name: "",
        brand: "",
        serialNumber: "",
        unit: "",
        direction: "เข้า",
        type: "ชั่วคราว",
      },

      axiosOptions: {
        headers: authHeader(),
      },

      enter: false,

      modal: false,

      hardwareList: [],
      checkInContents: [],
      activityId: "",
    };
  },
  created() {
    this.getCheckIn().then((res) => {
      console.log(res);
      this.checkInContents = res.data.data;
      console.log("ckc", this.checkInContents);
    });
    this.getHardware().then((res) => {
      this.hardwareList = res.data.data;
      console.log(this.hardwareList);
    });
  },
  methods: {
    async getActivityId() {
      const processData = {
        processId: this.$route.params.processId,
      };
      await axios
        .post(
          `${process.env.VUE_APP_BACKEND_URL}/process/view`,
          processData,
          this.axiosOptions
        )
        .then((res) => {
          this.activityId = res.data.activityId;
          console.log(this.activityId);
        });
    },
    async getCheckIn() {
      const axiosData = {
        app: {
          appId: "mophApp",
          listId: "list_checkIn",
        },
        search: [
          {
            paramName: "processId",
            paramValue: this.$route.params.processId,
          },
        ],
      };
      return await axios.post(
        `${process.env.VUE_APP_BACKEND_URL}/list/get`,
        axiosData,
        this.axiosOptions
      );
    },
    async getHardware() {
      const axiosData = {
        app: {
          appId: "mophApp",
          listId: "list_hardware",
        },
        search: [
          {
            paramName: "processId",
            paramValue: this.$route.params.processId,
          },
        ],
      };
      return await axios.post(
        `${process.env.VUE_APP_BACKEND_URL}/list/get`,
        axiosData,
        this.axiosOptions
      );
    },
    addHardware() {
      this.hardwareList.push(this.hardware);
      this.hardware = {
        name: "",
        brand: "",
        serialNumber: "",
        unit: "",
        direction: "เข้า",
        type: "ชั่วคราว",
      };
      this.modal = false;
    },
    async approvePermission() {
      this.loadingPage = true;
      const axiosData = {
        app: {
          appId: "mophApp",
          formId: "checkIn",
        },
        primaryKey: this.checkInContents[0].id,
        formData: {
          processName: "Review Check Out",
        },
      };
      await axios
        .post(
          `${process.env.VUE_APP_BACKEND_URL}/form/submit`,
          axiosData,
          this.axiosOptions
        )
        .then(async (res) => {
          console.log(res);
          const processData = {
            processId: this.checkInContents[0].processId,
          };
          await axios
            .post(
              `${process.env.VUE_APP_BACKEND_URL}/process/view`,
              processData,
              this.axiosOptions
            )
            .then(async (res) => {
              console.log(res);
              const activityId = res.data.activityId;
              const processData = {
                activityId: activityId,
                // variables: [
                //   {
                //     paramName: "considerRequirementStatus",
                //     paramValue: "approve",
                //   },
                // ],
              };
              await axios
                .post(
                  `${process.env.VUE_APP_BACKEND_URL}/process/complete`,
                  processData,
                  this.axiosOptions
                )
                .then(() => {
                  this.loadingPage = false;
                  this.$router.push("/data-center/view-tasks/");
                  // }
                });
            });
        });
    },
  },
};
</script>