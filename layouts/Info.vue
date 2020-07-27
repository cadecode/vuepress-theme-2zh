<template>
    <div class="info-container">
        <div class="post-title">{{title}}</div>
        <Content class="markdown-content" />
    </div>
</template>

<script>
    import AllMixin from '../components/AllMixin'

    export default {
        name: "Info",
        mixins:[AllMixin],
        data() {
            return {
                title: ''
            }
        },
        created() {
            this.title = this.$frontmatter.title || 'No title'
        }
    }
</script>
