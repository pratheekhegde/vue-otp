import Otp from "./components/Otp";

const VueOtp = {
  install(Vue) {
    Vue.component("otp-input", Otp);

    Vue.prototype.$vueOtp = {};
  }
};
export default VueOtp;

if (typeof window !== "undefined" && window.Vue) {
  window.Vue.use(VueOtp);
}
