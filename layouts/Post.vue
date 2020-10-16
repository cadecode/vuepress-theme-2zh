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
    let mermaid
    let renderMath
    const katexConf = {
        delimiters:
            [
                {left: "$$", right: "$$", display: true},
                {left: "$", right: "$", display: false}
            ],
        strict: false
    }
    
    export default {
        name: "Post",
        components: {
            Catalog: () => import('../components/Catalog'),
            Comment: () => import('../components/Comment')
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
            // 获取 mermaid 对象
            mermaid = mermaid || require(`cdn_mermaid`)
            // 获取 renderMathInElement 方法
            renderMath = renderMath || require(`cdn_renderMath`)
            // 调插件 api
            this.$nextTick(() => {
                mermaid.init({noteMargin: 10}, ".language-mermaid>pre>code")
                renderMath(document.querySelector('.J_markdownContent'), katexConf)
            })
            this.$bus.$emit('show-component')
        }
    }
</script>
