import 'nprogress/nprogress.css'

let nprogress

export default {
    name: 'GlobalMix',
    created() {
        this.$bus.$on('refresh-component', () => {
            this.flag = false
            this.$nextTick(() => {
                this.flag = true
            })
        })
        this.$bus.$on('component-show', () => {
            this.$nextTick(() => {
                setTimeout(() => {
                    this.$tool.removeClass(document.getElementsByClassName('component-content')[0], 'component-hide')
                }, 0)
            })
        })
    },
    beforeMount() {
        import('nprogress/nprogress').then((module) => {
            nprogress = module
            nprogress.start()
            this.$nextTick(() => {
                setTimeout(() => {
                    nprogress.done()
                }, 0)
            })
        })
    },
    beforeRouteEnter(to, from, next) {
        nprogress && nprogress.start()
        next((vm) => {
            setTimeout(() => {
                nprogress && nprogress.done()
            }, 0)
        })
    }
}
