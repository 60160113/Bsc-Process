<template>
  <div>
    <CCard>
      <CCardHeader>
        <h4>
          ตารางรายการจัดการการเปลี่ยนแปลง
        </h4>
      </CCardHeader>
      <CCardBody>
        <CDataTable
          :items="changeRequestList"
          :fields="changeRequestFields"
          :loading="tableLoading"
          column-filter
          table-filter
          items-per-page-select
          :items-per-page="10"
          hover
          sorter
          pagination
          :responsive="false"
        >
          <template #no-items-view>
            <div class="d-flex justify-content-center">
              ไม่พบรายการจัดการการเปลี่ยนแปลง
            </div>
          </template>
          <template #over-table>
            <CButton
              class="mb-3"
              size="sm"
              color="success"
              @click="changeRequestCreateModal = true"
              >ขออนุมัติดำเนินการเปลี่ยนแปลง</CButton
            >
          </template>
          <template #index="{ index }">
            <td>
              {{ index + 1 }}
            </td>
          </template>
          <template #processName="{item}">
            <td>
              <CBadge :color="getBadge(item.processName)">
                {{ item.processName }}
              </CBadge>
            </td>
          </template>
          <template #action="{ item }">
            <td>
              <CDropdown
                color="info"
                size="sm"
                toggler-text=""
                class="ml-1"
                placement="left-start"
              >
                <div>
                  <div>
                    <CDropdownItem
                      v-if="item.processName == 'รอตรวจสอบ'"
                      @click="reviewRequestPage(item.changeRequestId)"
                      >พิจารณาคำร้อง</CDropdownItem
                    >
                    <CDropdownItem
                      v-if="item.processName == 'รออนุมัติ'"
                      @click="considerRequestPage(item.changeRequestId)"
                      >อนุมัติคำร้อง</CDropdownItem
                    >
                    <CDropdownItem
                      v-if="item.processName == 'รอผลดำเนินการ'"
                      @click="approveRequestPage(item.changeRequestId)"
                      >ผลการดำเนินการ</CDropdownItem
                    >
                    <CDropdownDivider
                      v-if="item.processName !== 'เสร็จสิ้น'"
                    ></CDropdownDivider>
                  </div>
                  <CDropdownItem
                    @click="infoRequestPage(item.changeRequestId)"
                    >ดูข้อมูล</CDropdownItem
                  >
                  <CDropdownItem
                    @click="checkDelete(item)"
                    v-if="item.processName == 'รอตรวจสอบ'"
                    >ลบคำร้อง</CDropdownItem
                  >
                </div></CDropdown
              >
            </td>
          </template>
        </CDataTable>
      </CCardBody>
    </CCard>
    <CModal
      title="ขออนุมัติดำเนินการเปลี่ยนแปลง (Change Request Form)"
      color="info"
      size="xl"
      :show.sync="changeRequestCreateModal"
      centered
    >
      <CTextarea
        label="มีความประสงค์ขอเปลี่ยนแปลงเรื่อง"
        horizontal
        v-model="newChangeRequest.subject"
      />
      <CSelect
        label="เหตุผลที่ขอเปลี่ยนแปลง"
        placeholder="กรุณาเลือกเหตุผลที่ขอเปลี่ยนแปลง"
        :value.sync="newChangeRequest.reason"
        horizontal
        :options="reasonList"
      />
      <CSelect
        label="ประเภทของการเปลี่ยนแปลง"
        placeholder="กรุณาเลือกประเภทของการเปลี่ยนแปลง"
        :value.sync="newChangeRequest.reason"
        horizontal
        :options="[
          { value: 'Minor', label: 'Minor' },
          { value: 'Major', label: 'Major' },
          { value: 'Emergency', label: 'Emergency' },
        ]"
      />
      <CRow>
        <CCol md="3">
          <label for="">ระบบที่เกี่ยวข้อง</label>
        </CCol>
        <CCol>
          <CInputCheckbox
            v-for="(option, optionIndex) in systemOptions"
            :key="option"
            :label="option"
            :value="option"
            :custom="key > 1"
            :name="key"
            :checked="optionIndex === key"
            @update:checked="onSystemChecked"
          />
        </CCol>
      </CRow>
      <CSelect
        label="เอกสารที่แนบท้ายมาด้วย"
        v-model="newChangeRequest.attachment"
        :options="[
          { value: '', label: 'ไม่มี' },
          { value: 'Rollback Plan', label: 'Rollback Plan' }
        ]"
        horizontal
      />
      <CTextarea
        label="รายละเอียดการเปลี่ยนแปลง"
      />
      <template #footer>
        <CButton color="secondary" @click="changeRequestCreateModal = false"
          >ยกเลิก</CButton
        >
        <CButton color="success" @click="changeRequestCreate()">ยืนยัน</CButton>
      </template>
    </CModal>
  </div>
</template>
<script>
import { jogetService } from "@/helpers/joget-helper";
import { authHeader } from "@/helpers/auth-header";

export default {
  components: {
    jogetService,
    authHeader
  },
  data() {
    return {
      axiosOptions: {
        headers: authHeader()
      },
      infoAuth: [],
      tableLoading: false,
      changeRequestCreateModal: false,
      changeRequestEditModal: false,
      changeRequestList: [],
      changeRequestFields: [
        { key: "index", label: "#", _style: "width:5%" },
        {
          key: "changeRequestId",
          label: "เลขที่เอกสาร",
          _style: "min-width:5%"
        },
        {
          key: "dateCreated",
          label: "วันที่ร้องขอ",
          _style: "min-width:10%"
        },
        {
          key: "subject",
          label: "ความประสงค์",
          _style: "min-width:10%"
        },
        {
          key: "reason",
          label: "เหตุผล",
          _style: "min-width:10%"
        },
        {
          key: "requester",
          label: "ผู้ร้องขอ",
          _style: "min-width:10%"
        },
        { key: "processName", label: "สถานะ", _style: "min-width:5%" },
        { key: "action", label: "", _style: "width:5%;" }
      ],
      reasonList: [
        { value: "new", label: "เพิ่มระบบใหม่" },
        { value: "edit", label: "ปรับปรุง/แก้ไข" },
        { value: "other", label: "อื่นๆ" }
      ],
      departmentList: [],
      newChangeRequest: {
        subject: "",
        reason: "",
        createBy: "",
        modiflyBy: "",
        processId: "",
        processName: "รอตรวจสอบ",
        requester: "",
        changeRequestId: "",
        relatedSystem: [],
        attachment: '',
      },

      systemOptions: [
        'PC', 'Network', 'Server', 'System Software', 'Application Software', 'Storage', 'Security'
      ],
    };
  },
  created() {
    this.tableLoading = true;
    this.infoAuth = JSON.parse(localStorage.getItem("AuthUser"));
    this.newChangeRequest.createBy = this.infoAuth.fullname;
    this.newChangeRequest.modiflyBy = this.infoAuth.fullname;
    this.newChangeRequest.requester = this.infoAuth.fullname;
    this.getChangeRequest();
  },
  watch: {},
  methods: {
    async getChangeRequest() {
      const searchData = [
        {
          paramName: "changeRequestStatus",
          paramValue: "active"
        }
      ];
      await jogetService
        .list("mophApp", "list_moph_change_request", searchData)
        .then(res => {
          this.changeRequestList = res.data.data;
          this.tableLoading = false;
        });
    },
    async changeRequestCreate() {
      await jogetService
        .startProcess("mophApp", "changeManagementProcess")
        .then(async res => {
          console.log(res);
          this.newChangeRequest.processId = res.data.processId;
          if (this.newChangeRequest.reason == "new") {
            this.newChangeRequest.reason = "เพิ่มระบบใหม่";
          } else if (this.newChangeRequest.reason == "edit") {
            this.newChangeRequest.reason = "ปรับปรุง/แก้ไข";
          } else if (this.newChangeRequest.reason == "other") {
            this.newChangeRequest.reason = "อื่นๆ";
          }
          console.log(this.newChangeRequest);
          await jogetService
            .formSubmit(
              "mophApp",
              "moph_change_request",
              res.data.processId,
              this.newChangeRequest
            )
            .then(res => {
              console.log(res);
              this.changeRequestCreateModal = false;
              this.getChangeRequest();
            });
        });
    },
    onSystemChecked(value, event) {
      if (value) {
        this.newChangeRequest.relatedSystem.push(event.target.value)
      } else {
        this.newChangeRequest.relatedSystem.forEach((item, index) => {
          if (item === event.target.value) {
            this.newChangeRequest.relatedSystem.splice(index, 1)
          }
        })
      }
    },
    infoRequestPage(changeRequestId) {
      let routeData = this.$router.resolve({
        name: "InfoChangeRequest",
        query: { data: changeRequestId }
      });
      window.open(routeData.href, "_blank");
    },
    reviewRequestPage(changeRequestId) {
      let routeData = this.$router.resolve({
        name: "reviewChangeRequest",
        query: { data: changeRequestId }
      });
      window.open(routeData.href, "_blank");
    },
    considerRequestPage(changeRequestId) {
      let routeData = this.$router.resolve({
        name: "ConsiderChangeRequest",
        query: { data: changeRequestId }
      });
      window.open(routeData.href, "_blank");
    },
    approveRequestPage(changeRequestId) {
      let routeData = this.$router.resolve({
        name: "ApproveChangeRequest",
        query: { data: changeRequestId }
      });
      window.open(routeData.href, "_blank");
    },
    getBadge(status) {
      switch (status) {
        case "เสร็จสิ้น":
          return "success";
        case "รออนุมัติ":
          return "info";
        case "รอตรวจสอบ":
          return "secondary";
        case "รอผลดำเนินการ":
          return "secondary";
        default:
          "primary";
      }
    }
  }
};
</script>
