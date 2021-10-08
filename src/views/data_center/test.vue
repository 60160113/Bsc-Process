<template>
  <div>
    <CCard>
      <CCardHeader>
        <strong class="text-primary">อนุมัติคำขอเข้าศูนย์ปฏิบัติการ</strong>
      </CCardHeader>

      <CCardBody>
        <CDataTable
          :items="requests"
          :fields="dataField"
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
          <!-- hover
          striped
          border -->
          <template #no-items-view
            ><div class="text-center">ไม่พบข้อมูล</div>
          </template>
          <template #index="{ index }">
            <td width="5%">
              {{ index + 1 }}
            </td>
          </template>
          <!-- <template #date="{ item }">
            <td>
              {{ new Date(item.date).getDate() }}
              {{ thaiMonth[new Date(item.date).getMonth()] }}
              {{ new Date(item.date).getFullYear() + 543 }}
            </td>
          </template>
          <template #returnDate="{ item }">
            <td>
              {{ new Date(item.returnDate).getDate() }}
              {{ thaiMonth[new Date(item.returnDate).getMonth()] }}
              {{ new Date(item.returnDate).getFullYear() + 543 }}
            </td>
          </template> -->
          <template #action>
            <td>
              <CButton color="info" size="sm" class="ml-1">
                <CIcon :content="$options.freeSet.cilPeople" />
              </CButton>
            </td>
          </template>
        </CDataTable>
      </CCardBody>
      <CElementCover :opacity="0.8" v-if="loadingPage" />
    </CCard>
  </div>
</template>

<script>
// import { DatePicker } from "v-calendar";
import axios from "axios";
// import { jogetService } from "@/helpers/joget-helper";
import { authHeader } from "@/helpers/auth-header";
import { freeSet } from "@coreui/icons";
import thaiMonth from "@/assets/json/thaidate.json";

export default {
  components: {
    // "v-date-picker": DatePicker,
    // jogetService,
    // authHeader,
  },
  freeSet,
  data() {
    return {
      requests: [],
      thaiMonth: thaiMonth.thmonth,
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
      AuthUser: JSON.parse(localStorage.getItem("AuthUser")),
      enter: false,

      modal: false,

      hardwareList: [],

      dataField: [
        { key: "index", label: "#" },
        { key: "id", label: "ID", _style: "width:20%" },
        { key: "requester", label: "Requester", _style: "width:20%" },
        { key: "position", label: "Position", _style: "width:10%" },
        { key: "affiliation", label: "Affiliation", _style: "width:10%" },
        { key: "purpose", label: "Purpose", _style: "width:15%" },
        { key: "date", label: "Date", _style: "width:10%" },
        {
          key: "returnDate",
          label: "Return Date",
          _style: "width:10%",
        },
        { key: "checkInCard", label: "Card", _style: "width:15%" },
        { key: "action", label: "Action", _style: "width:10%" },
      ],
    };
  },
  created() {
    this.loadTable();
  },
  methods: {
    loadTable() {
      this.tableLoading = true;
      this.getItems().then((res) => {
        this.requests = res.data.data;
        console.log(this.requests);
      });
      this.tableLoading = false;
    },
    async getItems() {
      const axiosData = {
        app: {
          appId: "mophApp",
          listId: "list_checkIn",
        },
      };
      return await axios.post(
        `${process.env.VUE_APP_BACKEND_URL}/list/getAll`,
        axiosData,
        this.axiosOptions
      );
    },
  },
};
</script>