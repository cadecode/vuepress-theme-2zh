export default {
    name: 'AllMixin',
    beforeMount() {
        this.$bus.$emit('component-show')
    }
}