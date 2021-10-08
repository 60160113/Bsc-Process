export default [
  {
    path: "/change_request/changeRequest",
    name: "changeRequest",
    component: () => import("@/views/change_request/changeRequest.vue")
  },
  {
    path: "/change_request/reviewChangeRequest",
    name: "reviewChangeRequest",
    component: () => import("@/views/change_request/reviewChangeRequest.vue")
  },
  {
    path: "/change_request/ConsiderChangeRequest",
    name: "ConsiderChangeRequest",
    component: () => import("@/views/change_request/ConsiderChangeRequest.vue")
  },
  {
    path: "/change_request/ApproveChangeRequest",
    name: "ApproveChangeRequest",
    component: () => import("@/views/change_request/ApproveChangeRequest.vue")
  },
  {
    path: "/change_request/InfoChangeRequest",
    name: "InfoChangeRequest",
    component: () => import("@/views/change_request/InfoChangeRequest.vue")
  }
];
