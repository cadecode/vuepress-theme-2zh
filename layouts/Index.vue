<template>
    <div class="index-container">
        <Notice v-if="pagination.currentPage === 1" />
        <Cards :pages="pages" />
        <el-pagination class="index-pagination"
                       @current-change="handlePagination"
                       layout="prev, pager, next"
                       :pager-count="5"
                       :hide-on-single-page="true"
                       :page-size="pagination.pageSize"
                       :total="pagination.total"
                       :current-page="pagination.currentPage">
        </el-pagination>
    </div>
</template>

<script>
    import Notice from '../components/Notice'
    import Cards from '../components/Cards'
    export default {
        name: "Index",
        data() {
            return {
                pages: [],
                pagination: {}
            }
        },
        components: {
            Notice,
            Cards
        },
        methods: {
            handlePagination(num) {
                this.$router.push(this.$pagination._paginationPages[num - 1])
            }
        },
        created() {
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
            this.pagination = {
                total: matchedLength,
                pageSize: this.$themeConfig.pagination,
                currentPage: this.$pagination.paginationIndex + 1
            }
        },
        mounted() {
            this.$bus.$emit('show-component')
        }
    }
</script>
