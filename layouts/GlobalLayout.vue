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
    import Head from '../components/Head'
    import Foot from '../components/Foot'
    import BackTop from '../components/BackTop'
    import Loading from '../components/Loading'
    import Layout from './Layout'
    import Index from './Index'
    import Post from './Post'
    import Search from './Search'
    import Tag from './Tag'
    import Info from './Info'
    
    let progressBar
    
    export default {
        name: "GlobalLayout",
        components: {
            Head,
            Foot,
            BackTop,
            Loading,
            Layout,
            Index,
            Post,
            Search,
            Tag,
            Info
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
            this.$bus.$on('component-show', () => {
                setTimeout(() => {
                    this.showLoading = false
                    this.$bus.loaded = true
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
