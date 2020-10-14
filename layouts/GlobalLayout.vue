<template>
    <div class="global-container">
        <Head/>
        <!--        <component class="component-content component-hide" :is="getLayout" v-if="flag" />-->
        <component class="component-content" :is="getLayout" v-if="flag"/>
        <Foot/>
        <BackTop/>
    </div>
</template>

<script>
    import Head from '../components/Head'
    import Foot from '../components/Foot'
    import BackTop from '../components/BackTop'
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
            Layout,
            Index,
            Post,
            Search,
            Tag,
            Info
        },
        data() {
            return {
                flag: true
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
        mounted() {
        
        }
    }
</script>
