<template>
    <div class="index-container">
        <Notice v-if="pagination.currentPage === 1" />
        <el-row>
            <el-col :xs="24" :sm="12" :md="8" v-for="(item, index) in pages" :index="index">
                <div class="index-card-wrapper">
                    <el-card class="index-card" shadow="always" :body-style="{ padding: '0px' }">
                        <div class="index-card-cover" :style="`background-image: url(${item.cover});`"></div>
                        <div class="index-card-desc">{{item.desc}}</div>
                        <div class="index-card-pined" v-if="item.pined">
                            <i class="el-icon-s-flag" />
                        </div>
                        <router-link :to="item.path">
                            <div class="index-card-title">
                                {{item.title}}
                            </div>
                            <div class="index-card-meta">
                                <div class="index-card-date">
                                    <i class="el-icon-edit-outline" />
                                    {{item.date}}
                                </div>
                                <div class="index-card-tag">
                                    <i class="el-icon-paperclip" />
                                    {{item.tag}}
                                </div>
                            </div>
                        </router-link>
                    </el-card>
                </div>
            </el-col>
        </el-row>
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
    import AllMixin from '../components/AllMixin'

    import Notice from '../components/Notice'

    export default {
        name: "Index",
        mixins:[AllMixin],
        data() {
            return {
                pages: [],
                pagination: {}
            }
        },
        components: {
            Notice
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
                    date: day(item.frontmatter.date || '1970/1/1').format('YYYY-MM-DD'),
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
        }
    }
</script>
