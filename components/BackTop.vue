<template>
    <div class='backtop-container' v-show="show" @click="backToTop">
        <i class="el-icon-caret-top"></i>
    </div>
</template>

<script>
    export default {
        name: "BackTop",
        data() {
            return {
                show: false,
            }
        },
        methods: {
            backToTop() {
                this.$tool.scrollTo(0)
            }
        },
        beforeMount() {
            this.$nextTick(() => {
                window.addEventListener('scroll', () => {
                    if (this.$tool.getScrollOffset().top > 200) {
                        !this.show && (this.show = true)
                    } else {
                        this.show && (this.show = false)
                    }
                })
            })
        }
    }
</script>
