<template>
    <div class="comment-container">
        <div class="comment-title">
            <i class="el-icon-s-comment" />
            Comment here, be cool~
        </div>
        <div class=" J_comment"></div>
    </div>
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
                    el: '.J_comment',
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

