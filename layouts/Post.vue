<template>
    <div class="post-container">
        <div class="post-title">{{ title }}</div>
        <div class="post-tag">
            <router-link :to="`/search/${item}`" v-for="(item, index) in tag" :key="index">
                <i class="el-icon-paperclip" />
                {{ item }}
            </router-link>
        </div>
        <div class="post-desc">{{ desc }}</div>
        <Content class="markdown-content J_markdownContent" />
        <Catalog />
        <Comment />
    </div>
</template>

<script>
    import Comment from '../components/Comment'
    import Catalog from '../components/Catalog'
    
    export default {
        name: "Post",
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
        },
        mounted() {
            // 调插件 mermaid、katex api
            this.$nextTick(() => {
                this.$bus.mermaid.init({noteMargin: 10}, ".language-mermaid>pre>code")
                this.$bus.renderMath(document.querySelector('.J_markdownContent'), this.$bus.katexConfig)
            })
            this.$bus.$emit('show-component')
        }
    }
</script>
