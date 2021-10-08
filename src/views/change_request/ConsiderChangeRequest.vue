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
          <CCol sm="12">
            <CRow>
              <CCol sm="3">วันที่เริ่มดำเนินการ</CCol>
              <CCol sm="9">{{ changeRequestList.startDateTime }}</CCol>
            </CRow>
          </CCol>
          <CCol sm="12">
            <CRow>
              <CCol sm="3">วันที่คาดว่าแล้วเสร็จ</CCol>
              <CCol sm="9">{{ changeRequestList.endDateTime }}</CCol>
            </CRow>
          </CCol>
          <CCol sm="12">
            <CRow>
              <CCol sm="3">ประเภทของการเปลี่ยนแปลง</CCol>
              <CCol sm="9">{{ changeRequestList.changeType }}</CCol>
            </CRow>
          </CCol>
          <CCol sm="12">
            <CRow>
              <CCol sm="3">ระบบที่เกี่ยวข้อง</CCol>
              <CCol sm="9">{{ changeRequestList.relatedSystem }}</CCol>
            </CRow>
          </CCol>
          <CCol sm="12">
            <CRow>
              <CCol sm="3">เอกสารที่แนบมาด้วย</CCol>
              <CCol sm="9">{{ changeRequestList.attachment }}</CCol>
            </CRow>
          </CCol>
          <CCol sm="12">
            <CRow>
              <CCol sm="3">รายละเอียดการเปลี่ยนแปลง</CCol>
              <CCol sm="9">{{ changeRequestList.detail }}</CCol>
            </CRow>
          </CCol>
          <CCol sm="12">
            <CRow>
              <CCol sm="3">ผลกระทบจากการเปลี่ยนแปลง</CCol>
              <CCol sm="9">{{ changeRequestList.effect }}</CCol>
            </CRow>
          </CCol>
          <CCol sm="12">
            <CRow>
              <CCol sm="3">แนวทาง / ขั้นตอนการดำเนินงาน</CCol>
              <CCol sm="9">{{ changeRequestList.operation }}</CCol>
            </CRow>
          </CCol>
        </CRow>
      </CCardBody>
      <CCardFooter>
        <CRow>
          <CCol sm="12">
            <p>
              <strong class="text-primary">
                ส่วนที่ 2 การพิจารณาอนุมัติการเปลี่ยนแปลง</strong
              >
            </p>
          </CCol>
          <CCol>
            <template>
              <p><strong>ผลพิจารณาอนุมัติให้ดำเนินการ</strong></p>
              <CRow form class="form-group">
                <CCol lg="3" sm="3"><strong>เลือก</strong></CCol>
                <CInputRadio
                  horizontal
                  v-for="(option, optionKey) in optionsConsider"
                  :key="optionKey"
                  :label="option.label"
                  :value="option.value"
                  :inline="true"
                  :checked="
                    changeRequestConsider.considerStatus === option.value
                  "
                  @update:checked="
                    () => (changeRequestConsider.considerStatus = option.value)
                  "
                />
              </CRow>
            </template>
          </CCol>
        </CRow>
        <CRow>
          <CCol>
            <strong>
              <CTextarea
                label="ความคิดเห็น"
                placeholder="ช่องกรอกความคิดเห็น"
                rows="3"
                horizontal
                :lazy="false"
                v-model="changeRequestConsider.comment"
              />
            </strong>
          </CCol>
        </CRow>
        <CButton
          class="mb-3"
          size="sm"
          color="success"
          block
          @click="reviewConsider()"
          >บันทึก</CButton
        >
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
      changeRequestConsider: {
        processId: "",
        considerName: "",
        considerStatus: "",
        comment: ""
      },
      optionsConsider: [
        { value: "consider", label: "อนุมัติให้ดำเนินการและทดสอบ" },
        { value: "nontest", label: "อนุมัติให้ดำเนินการโดยไม่ต้องทดสอบ" },
        { value: "reject", label: "ไม่อนุมัติ" }
      ]
    };
  },
  created() {
    // this.tableLoading = true;
    this.getChangeRequest();
    this.newChangeRequest.changeRequestId = this.$route.query.data;
    this.infoAuth = JSON.parse(localStorage.getItem("AuthUser"));
    // this.changeRequestConsider.considerName = this.infoAuth.fullname;
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
    async reviewConsider() {
      this.changeRequestConsider.processId = this.newChangeRequest.processId;
      this.changeRequestConsider.considerName = this.infoAuth.fullname;
      console.log(this.changeRequestConsider);
      await jogetService
        .formSubmit(
          "mophApp",
          "moph_change_request_approve",
          "",
          this.changeRequestConsider
        )
        .then(res => {
          var assignTo = "";
          var processName = "รอผลดำเนินการ";
          const formData = {
            processName: processName,
            assignTo: assignTo
          };
          console.log("change status");
          jogetService
            .formSubmit(
              "mophApp",
              "moph_change_request",
              this.newChangeRequest.id,
              formData
            )
            .then(res => {
              const processId = this.newChangeRequest.processId;
              jogetService.getCurrentActivity(processId).then(res => {
                const variableData = [
                  {
                    paramName: "approveChange",
                    paramValue: this.changeRequestConsider.considerStatus
                  }
                ];
                jogetService
                  .processCompleteWithVariable(
                    res.data.activityId,
                    variableData
                  )
                  .then(res => {
                    this.changeRequestMain();
                  });
              });
            });
        });
    },
    changeRequestMain() {
      this.$router.push({ name: "changeRequest" });
    }
  }
};
</script>
