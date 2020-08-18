<template>
    <div class="J_comment-container"></div>
</template>

<script>
    import comment from 'valine'

    export default {
        name: 'Comment',
        data() {
            return {
                appId: '',
                appKey: ''
            }
        },
        created() {
            this.appId = this.$themeConfig.comment[0]
            this.appKey = this.$themeConfig.comment[1]
        },
        mounted() {
            if (this.appId && this.appKey) {
                new comment({
                    el: '.J_comment-container',
                    appId: this.appId,
                    addKey: this.appKey
                })
            }
        }
    }
</script>
