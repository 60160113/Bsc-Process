<script>
import menu from "./menu/index";
import { freeSet } from "@coreui/icons";
import icons from "@/assets/icons/icons.js";
export default {
  name: "nav",
  components: {
    freeSet,
    icons,
  },
  data() {
    return {
      menu: menu,
    };
  },
  computed: {
    sidebarItems() {
      return [
        {
          _name: "CSidebarNav",
          _children: this.menu,
        },
      ];
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Sarabun:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800&display=swap");
* {
  font-family: "Sarabun", sans-serif;
}
</style>
