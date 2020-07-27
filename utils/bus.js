export default {
    install(Vue){
        Vue.prototype.$bus = new Vue()
    }
}