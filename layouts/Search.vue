<template>
    <div class="search-container">
        <el-row>
            <el-col :xs="{span: 18, offset: 3}"
                    :sm="{span: 16, offset: 4}"
                    :md="{span: 14, offset: 5}"
                    :lg="{span: 12, offset: 6}"
                    :xl="{span: 10, offset: 7}">
                <SearchBox />
            </el-col>
        </el-row>
        <div class="search-tag-wrapper">
            <p>
                <i class="el-icon-collection-tag" />
                The following tags help to search ~
            </p>
            <router-link v-for="(item, index) in tags" :index="index" :to="item.path">
                <i class="el-icon-paperclip" />
                {{ item.name }}
            </router-link>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Search",
        components: {
            SearchBox: () => import('@vuepress/plugin-search/SearchBox')
        },
        data() {
            return {
                tags: []
            }
        },
        created() {
            this.tags = this.$frontmatterKey.list
        },
        mounted() {
            this.$bus.$emit('show-component')
        }
    }
</script>
