<template>
    <div class="notice-container" v-if="notice.length!=0">
        <div class="notice-content">
            <i class="el-icon-microphone"></i>
            <ul class="notice-list J_notice-list">
                <li v-for="(item, index) in notice" :key="index">
                    <a :href="item.url" target="_blank">{{item.text}}</a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Notice",
        data() {
            return {
                notice: [],
                interval: 0
            }
        },
        created() {
            this.notice = this.$themeConfig.notice
        },
        beforeMount() {
            this.$nextTick(() => {
                let oUl = document.getElementsByClassName('J_notice-list')[0]
                let oLi = oUl.getElementsByTagName('li')
                let len = oLi.length
                this.interval = setInterval(function () {
                    oLi[0].style.marginTop = "-20px"
                    setTimeout(function () {
                        oUl.appendChild(oLi[0])
                        oLi[len - 1].style.marginTop = "0px"
                    }, 500)
                }, 3000)
            })
        },
        beforeDestroy() {
            clearInterval(this.interval)
        }
    }
</script>
