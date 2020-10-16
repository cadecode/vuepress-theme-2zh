<template>
    <div class="info-container">
        <div class="post-title">{{ title }}</div>
        <Content class="markdown-content" />
        <Comment />
    </div>
</template>

<script>
    import Comment from '../components/Comment'
    
    export default {
        name: "Info",
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
        },
        mounted() {
            this.$bus.$emit('show-component')
        }
        
    }
</script>
