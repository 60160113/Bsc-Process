<template>
  <div>
    <CCard>
      <CCardHeader>
        <strong class="text-primary"
          >แบบขออนุมัติดำเนินการเปลี่ยนแปลง (Change Request Form)</strong
        >
      </CCardHeader>

      <CCardBody>
        <CRow>
          <CCol sm="12">
            <p>
              <strong class="text-primary">
                ส่วนที่ 1 รายละเอียดการขออนุมัติดำเนินการเปลี่ยนแปลง</strong
              >
            </p>
          </CCol>
          <CCol sm="12">
            <CRow>
              <CCol sm="3">ผู้ร้องขอ</CCol>
              <CCol sm="9">{{ changeRequestList.requester }}</CCol>
            </CRow>
          </CCol>
          <CCol sm="12">
            <CRow>
              <CCol sm="3">วันที่ร้องขอ</CCol>
              <CCol sm="9">{{ changeRequestList.dateCreated }}</CCol>
            </CRow>
          </CCol>
          <CCol sm="12">
            <CRow>
              <CCol sm="3">มีความประสงค์ขอเปลี่ยนแปลงเรื่อง</CCol>
              <CCol sm="9">{{ changeRequestList.subject }}</CCol>
            </CRow>
          </CCol>
          <CCol sm="12">
            <CRow>
              <CCol sm="3">เหตุผลที่ขอเปลี่ยนแปลง</CCol>
              <CCol sm="9">{{ changeRequestList.reason }}</CCol>
            </CRow>
          </CCol>
        </CRow>
        <CRow>
          <CCol sm="12">
            <CRow>
              <CCol col="3">
                <label style="margin-top: 6px">วันที่เริ่มดำเนินการ</label>
              </CCol>
              <CCol
                ><v-date-picker
                  :min-date="new Date()"
                  mode="date"
                  :masks="{
                    input: 'DD/MM/YYYY'
                  }"
                  v-model="newChangeRequest.startDateTime"
              /></CCol>
            </CRow>
            <CRow class="mt-3 mb-3">
              <CCol col="3">
                <label style="margin-top: 6px">วันที่คาดว่าแล้วเสร็จ</label>
              </CCol>
              <CCol
                ><v-date-picker
                  :min-date="new Date()"
                  mode="date"
                  :masks="{
                    input: 'DD/MM/YYYY'
                  }"
                  v-model="newChangeRequest.endDateTime"
              /></CCol>
            </CRow>
          </CCol>
          <CCol sm="12">
            <CSelect
              label="ประเภทของการเปลี่ยนแปลง"
              placeholder="กรุณาเลือกประเภทของการเปลี่ยนแปลง"
              :value.sync="newChangeRequest.changeType"
              horizontal
              :options="changeTypeList"
            />
          </CCol>
          <CCol sm="12">
            <CSelect
              label="ระบบที่เกี่ยวข้อง"
              placeholder="กรุณาเลือกระบบที่เกี่ยวข้อง"
              :value.sync="newChangeRequest.relatedSystem"
              horizontal
              :options="relatedSystemList"
            />
          </CCol>
          <CCol sm="12">
            <CSelect
              label="เอกสารที่แนบมาด้วย"
              placeholder="กรุณาเลือกเอกสารที่แนบมาด้วย"
              :value.sync="newChangeRequest.attachment"
              horizontal
              :options="attachmentList"
            />
          </CCol>
        </CRow>
        <CTextarea
          label="รายละเอียดการเปลี่ยนแปลง"
          horizontal
          v-model="newChangeRequest.detail"
        />
        <CTextarea
          label="ผลกระทบจากการเปลี่ยนแปลง"
          horizontal
          v-model="newChangeRequest.effect"
        />
        <CTextarea
          label="แนวทาง / ขั้นตอนการดำเนินงาน"
          horizontal
          v-model="newChangeRequest.operation"
        />
        <CRow> </CRow>
      </CCardBody>
      <CCardFooter>
        <CButton color="success" @click="changeRequestCreate()">บันทึก</CButton>
      </CCardFooter>
    </CCard>
  </div>
</template>

<script>
import { jogetService } from "@/helpers/joget-helper";
import { authHeader } from "@/helpers/auth-header";
import { DatePicker } from "v-calendar";

export default {
  components: {
    "v-date-picker": DatePicker,
    jogetService,
    authHeader
  },
  data() {
    return {
      axiosOptions: {
        headers: authHeader()
      },
      infoAuth: [],
      changeRequestList: [],
      newChangeRequest: {
        id: "",
        changeRequestId: "",
        subject: "",
        reason: "",
        modiflyBy: "",
        processId: "",
        processName: "",
        startDateTime: new Date(),
        endDateTime: new Date(),
        changeType: "",
        relatedSystem: "",
        attachment: "",
        detail: "",
        effect: "",
        operation: "",
        requester: "",
        teamLeader: "",
        assignTo: ""
      },
      changeTypeList: [
        { value: "minor", label: "Minor" },
        { value: "major", label: "Major" },
        { value: "emergency", label: "Emergency" }
      ],
      relatedSystemList: [
        { value: "pc", label: "PC" },
        { value: "network", label: "Network" },
        { value: "server", label: "Server" },
        { value: "systemSoftware", label: "System Software" },
        { value: "applicationSoftware", label: "Application Software" },
        { value: "storage", label: "Storage" },
        { value: "security", label: "Security" },
        { value: "other", label: "other" }
      ],
      attachmentList: [
        { value: "rollback", label: "Rollback Plan" },
        { value: "other", label: "other" }
      ]
    };
  },
  created() {
    // this.tableLoading = true;
    // this.infoAuth = JSON.parse(localStorage.getItem("AuthUser"));
    // this.newChangeRequest.createBy = this.infoAuth.fullname;
    // this.newChangeRequest.modiflyBy = this.infoAuth.fullname;
    // this.editChangeRequest.modiflyBy = this.infoAuth.fullname;
    this.getChangeRequest();
    this.newChangeRequest.changeRequestId = this.$route.query.data;
  },
  methods: {
    async getChangeRequest() {
      const searchData = [
        {
          paramName: "changeRequestStatus",
          paramValue: "active"
        },
        {
          paramName: "changeRequestId",
          paramValue: this.newChangeRequest.changeRequestId
        },
        {
          paramName: "processName",
          paramValue: "รอตรวจสอบ"
        }
      ];
      await jogetService
        .list("mophApp", "list_moph_change_request", searchData)
        .then(res => {
          this.changeRequestList = res.data.data[0];
          this.newChangeRequest = res.data.data[0];
          this.newChangeRequest.processName = "รออนุมัติ";
          console.log(this.newChangeRequest);
        });
    },
    async changeRequestCreate() {
      console.log("this.newChangeRequest", this.newChangeRequest);
      if (this.newChangeRequest.changeType == "minor") {
        this.newChangeRequest.assignTo = "หัวหน้าทีมนั้นๆ";
      } else if (this.newChangeRequest.changeType == "major") {
        this.newChangeRequest.assignTo = "หัวหน้าทีม";
      } else if (this.newChangeRequest.changeType == "emergency") {
        this.newChangeRequest.assignTo = "ผู้บริหาร";
      }
      await jogetService
        .formSubmit(
          "mophApp",
          "moph_change_request",
          this.newChangeRequest.id,
          this.newChangeRequest
        )
        .then(res => {
          jogetService
            .getCurrentActivity(this.changeRequestList.processId)
            .then(res => {
              this.changeRequestMain();
            });
        });
    },
    changeRequestMain() {
      this.$router.push({ name: "changeRequest" });
    }
  }
};
</script>
