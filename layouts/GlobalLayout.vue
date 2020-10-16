<template>
    <div class="global-container">
        <Head />
        <component class="component-content component-hide" :is="getLayout" v-if="ifComponent" />
        <Foot />
        <BackTop />
        <Loading v-show="showLoading" />
    </div>
</template>

<script>
    let progressBar
    
    export default {
        name: "GlobalLayout",
        components: {
            Head: ()=> import('../components/Head'),
            Foot: ()=> import('../components/Foot'),
            BackTop: ()=> import('../components/BackTop'),
            Loading: ()=> import('../components/Loading'),
            Layout: ()=> import('./Layout'),
            Index: ()=> import('./Index'),
            Post: ()=> import('./Post'),
            Search: ()=> import('./Search'),
            Tag: ()=> import('./Tag'),
            Info: ()=> import('./Info')
        },
        data() {
            return {
                ifComponent: true,
                showLoading: true
            }
        },
        computed: {
            getLayout() {
                let path = this.$page.path
                let layout = this.$frontmatter.layout
                if (path && layout) {
                    return layout
                } else {
                    return 'Layout'
                }
            }
        },
        created() {
            this.$bus.$on('refresh-component', () => {
                this.ifComponent = false
                this.$nextTick(() => {
                    this.ifComponent = true
                })
            })
            this.$bus.$on('show-component', () => {
                setTimeout(() => {
                    this.showLoading = false
                    const component = document.querySelector('.component-content')
                    const head = document.querySelector('.head-container')
                    this.$tool.removeClass(component, 'component-hide')
                    this.$tool.removeClass(head, 'head-hide')
                }, this.showLoading ? 500 : 100)
            })
        },
        beforeRouteEnter(to, from, next) {
            progressBar = progressBar || require(`cdn_nprogress`)
            progressBar.start()
            next(() => {
                setTimeout(() => {
                    progressBar.done()
                }, 100)
            })
        }
    }
</script>
