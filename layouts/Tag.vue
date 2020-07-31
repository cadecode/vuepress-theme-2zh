<template>
    <div class="tag-container">
        <!--<el-row>-->
        <!--    <el-col :xs="{span: 20, offset: 2}"-->
        <!--            :sm="{span: 18, offset: 3}"-->
        <!--            :md="{span: 16, offset: 4}"-->
        <!--            :lg="{span: 14, offset: 5}"-->
        <!--            :xl="{span: 12, offset: 6}">-->
                <p class="tag-name">
                    <i class="el-icon-collection" />
                    {{tagName}}
                </p>
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
        <!--    </el-col>-->
        <!--</el-row>-->
    </div>
</template>

<script>
    import AllMixin from '../components/AllMixin'
    export default {
        name: "Tag",
        mixins:[AllMixin],
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
                    date: day(item.frontmatter.date || '1970/1/1').format('YYYY-MM-DD'),
                    desc: item.frontmatter.description || 'No description',
                    tag: Array.isArray(item.frontmatter.tag) ? item.frontmatter.tag[0] : item.frontmatter.tag || 'No tag',
                    pined: !!item.frontmatter.pined,
                    path: item.path
                })
            })
        }
    }
</script>
