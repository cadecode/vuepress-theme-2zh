<template>
    <div class="foot-container">
        <div class="foot-links">
            <a v-for="(item, index) in links"
               :key="index"
               :href="item.url"
               target="_blank">
                {{item.text}}
            </a>
        </div>
        <div class="foot-meta">
            <p>Copyright &copy; 2020 {{author}}</p>
            <p>
                Theme
                <a href="https://github.com/cadecode/vuepress-theme-2zh" target="_blank">2zh</a>
                powered by
                <a href="https://www.vuepress.cn/" target="_blank">vuepress</a>
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
                links: []
            }
        },
        created() {
            this.author = this.$themeConfig.author
            this.links = this.$themeConfig.links
        }
    }
</script>
