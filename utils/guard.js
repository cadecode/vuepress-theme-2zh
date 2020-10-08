export default {
    install(Vue, router){
        router.afterEach(() => {
            Vue.prototype.$bus.$emit('refresh-component')
        })
    }
}