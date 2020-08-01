<template>
    <div class="tag-container">
        <p class="tag-name">
            <i class="el-icon-collection" />
            {{tagName}}
        </p>
        <Cards :pages="pages" />
    </div>
</template>

<script>
    import AllMixin from '../components/AllMixin'

    import Cards from '../components/Cards'

    export default {
        name: "Tag",
        mixins: [AllMixin],
        components:{
            Cards
        },
        data() {
            return {
                pages: [],
                tagName: ''
            }
        },
        created() {
            this.tagName = this.$currentTag.key
            const pages = this.$pagination.pages
            const matchedPages = this.$pagination._matchedPages
            const matchedLength = matchedPages.length
            const day = require('dayjs')
            pages.forEach((item) => {
                this.pages.push({
                    cover: item.frontmatter.cover || `/cover/${matchedLength - matchedPages.indexOf(item)}.png`,
                    title: item.frontmatter.title || 'No title',
                    date: day(new Date(item.frontmatter.date || '1970/1/1')).format('YYYY-M-D'),
                    desc: item.frontmatter.description || 'No description',
                    tag: Array.isArray(item.frontmatter.tag) ? item.frontmatter.tag[0] : item.frontmatter.tag || 'No tag',
                    pined: !!item.frontmatter.pined,
                    path: item.path
                })
            })
        }
    }
</script>
