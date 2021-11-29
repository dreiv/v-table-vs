import { createApp } from "vue";

import Store from "@/store";
import App from "@/ui/App.vue";

import "@/ui/assets/styles/base/index.scss";

createApp(App).use(Store).mount("#app");
