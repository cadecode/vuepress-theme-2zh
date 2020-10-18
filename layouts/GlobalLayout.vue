<template>
    <div class="global-container">
        <Head />
        <component class="component-content component-hide" :is="getLayout" v-if="ifComponent" />
        <Foot v-if="ifComponent" />
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
            next((vm) => {
                vm.$bus.nprogress && vm.$bus.nprogress.start()
                setTimeout(() => {
                    vm.$bus.nprogress && vm.$bus.nprogress.done()
                }, 100)
            })
        },
        beforeMount() {
            this.$bus.valine = require(`cdn_valine`)
            this.$bus.mermaid = require(`cdn_mermaid`)
            this.$bus.nprogress = require(`cdn_nprogress`)
            this.$bus.renderMath = require(`cdn_renderMath`)
            this.$bus.katexConfig = {
                delimiters:
                    [
                        {left: "$$", right: "$$", display: true},
                        {left: "$", right: "$", display: false}
                    ],
                strict: false
            }
        }
    }
</script>
