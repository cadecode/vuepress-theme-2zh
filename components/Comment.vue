<template>
    <div class="comment-container J_comment-container"></div>
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
                    appKey: this.appKey,
                    enableQQ: true,
                    placeholder: '昵称框填写 QQ，可获取头像、邮箱，快速评论~',
                    pageSize: 1,
                    path: window.location.pathname
                })
            }
        }
    }
</script>

