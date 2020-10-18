<template>
    <div class="comment-container" v-if="ifComment">
        <div class="comment-title">
            <i class="el-icon-s-comment" />
            Comment here, be cool~
        </div>
        <div class="J_comment" ></div>
    </div>
</template>

<script>
    export default {
        name: 'Comment',
        data() {
            return {
                ifComment: true
            }
        },
        mounted() {
            const appId = this.$themeConfig.comment[0]
            const appKey = this.$themeConfig.comment[1]
            if (!appId || !appKey) {
                this.ifComment = false
            }
        }
    }
</script>

