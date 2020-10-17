<template>
    <div class="foot-container">
        <div class="foot-links">
            <a v-if="domain" :href="`${domain}/rss.xml`" target="_blank">Rss</a>
            <a v-for="(item, index) in links"
               :key="index"
               :href="item.url"
               target="_blank">
                {{ item.text }}
            </a>
        </div>
        <div class="foot-meta">
            <p>Copyright &copy; 2020 {{ author }}</p>
            <p>
                Theme
                <a href="https://github.com/cadecode/vuepress-theme-2zh" target="_blank">2zh</a>
                powered by
                <a href="https://www.vuepress.cn/" target="_blank">vuepress</a>
            </p>
            <p :id="this.$route.path" v-if="ifVisitor" class="leancloud_visitors"
               :data-flag-title="this.$frontmatter.title">
                本页访问次数 <i class="leancloud-visitors-count">0</i>
            </p>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Foot",
        data() {
            return {
                author: '',
                links: [],
                domain: '',
                visitorId: '/',
                ifVisitor: true
            }
        },
        created() {
            this.author = this.$themeConfig.author
            this.links = this.$themeConfig.links
            this.domain = this.$themeConfig.domain.trim().replace(/\/$/, '')
        },
        mounted() {
            const appId = this.$themeConfig.comment[0]
            const appKey = this.$themeConfig.comment[1]
            if (!appId || !appKey) {
                this.ifVisitor = false
                return
            }
            new this.$bus.valine({
                el: '.J_comment',
                appId,
                appKey,
                enableQQ: true,
                placeholder: '昵称框填写 QQ，可自动获取 QQ 名称以及头像、邮箱哦~',
                visitor: true
            })
        }
    }
</script>
