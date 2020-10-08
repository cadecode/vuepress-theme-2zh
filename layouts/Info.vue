<template>
    <div class="info-container">
        <div class="post-title">{{title}}</div>
        <Content class="markdown-content" />
        <Comment />
    </div>
</template>

<script>
    import AllMixin from '../mixins/AllMixin'
    import Comment from '../components/Comment'

    export default {
        name: "Info",
        mixins: [AllMixin],
        components: {
            Comment
        },
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
