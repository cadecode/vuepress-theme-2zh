<template>
    <div class="post-container">
        <div class="post-title">{{title}}</div>
        <div class="post-tag">
            <router-link :to="`/search/${item}`" v-for="(item, index) in tag" :key="index">
                <i class="el-icon-paperclip" />
                {{item}}
            </router-link>
        </div>
        <div class="post-desc">{{desc}}</div>
        <Content class="markdown-content J_markdown-content" />
        <Catalog />
        <Comment />
    </div>
</template>

<script>
    import AllMix from '../components/AllMixin'
    import PostMix from '../components/PostMixin'

    import Catalog from '../components/Catalog'
    import Comment from '../components/Comment'

    export default {
        name: "Post",
        mixins: [AllMix, PostMix],
        components: {
            Catalog,
            Comment
        },
        data() {
            return {
                title: '',
                desc: '',
                tag: []
            }
        },
        created() {
            const conf = this.$frontmatter
            this.title = conf.title || 'No title'
            this.desc = conf.description || 'No description'
            if (Array.isArray(conf.tag)) {
                this.tag = conf.tag
            } else if (conf.tag) {
                this.tag.push(conf.tag)
            }
        }
    }
</script>
