<template>
    <div class="post-container">
        <div class="post-title">{{ title }}</div>
        <div class="post-tag">
            <router-link :to="`/search/${item}`" v-for="(item, index) in tag" :key="index">
                <i class="el-icon-paperclip"/>
                {{ item }}
            </router-link>
        </div>
        <div class="post-desc">{{ desc }}</div>
        <Content class="markdown-content J_markdownContent"/>
        <Catalog/>
        <Comment/>
    </div>
</template>

<script>
    import Catalog from '../components/Catalog'
    import Comment from '../components/Comment'
    
    const renderModule = {
        mermaid: {
            init: null
        },
        katex: {
            init: null
        },
        katexConf: {
            delimiters:
                [
                    {left: "$$", right: "$$", display: true},
                    {left: "$", right: "$", display: false}
                ],
            strict: false
        }
    }
    
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
            // 加载 cdn 插件
            if (!renderModule.mermaid.init) {
                // 获取 mermaid 对象
                renderModule.mermaid = require(`cdn_mermaid`)
            }
            if (!renderModule.katex.init) {
                // 获取 renderMathInElement 方法
                renderModule.katex.init = require(`cdn_renderMath`)
            }
            // 调插件 api
            this.$nextTick(() => {
                renderModule.mermaid.init({noteMargin: 10}, ".language-mermaid>pre>code")
                renderModule.katex.init(document.querySelector('.J_markdownContent'), renderModule.katexConf)
            })
        }
    }
</script>
