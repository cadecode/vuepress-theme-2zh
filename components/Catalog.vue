<template>
    <div class="catalog-container" v-show="show">
        <div class="catalog-content catalog-hide J_catalogContent" v-if="headers.length!==0">
            <ul>
                <li v-for="(item, index) in headers" :key="index"
                    @click="clickHeaders(index)"
                    :class="`catalog-item-${item.level}`">
                    {{ item.title }}
                </li>
            </ul>
        </div>
        <div class='catalog-open' v-if="this.$frontmatter.layout === 'Post'" @click="openAnchor()">
            <i class="el-icon-s-operation"></i>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Catalog",
        data() {
            return {
                headers: [],
                titles: [],
                show: false,
            }
        },
        methods: {
            clickHeaders(index) {
                const target = this.$tool.getPositionInPage(this.titles[index]).top
                const distance = this.$tool.getScrollOffset().top <= target ? 0 : 70
                this.$tool.scrollTo(target - distance)
            },
            openAnchor() {
                const catalog = document.querySelector('.J_catalogContent')
                this.$tool.toggleClass(catalog, 'catalog-hide')
            }
        },
        mounted() {
            // catalog item
            this.headers = this.$page.headers || []
            this.titles = document.querySelectorAll('.J_markdownContent h2, .J_markdownContent h3')
            
            window.addEventListener('scroll', () => {
                this.show = this.$tool.getScrollOffset().top > 200;
            })
            
            this.$nextTick(() => {
                const getScrollOffset = this.$tool.getScrollOffset
                const addClass = this.$tool.addClass
                const removeClass = this.$tool.removeClass
                const getPositionUp = (el) => {
                    return this.$tool.getPositionInPage(el).top - 70
                }
                const getPositionDown = (el) => {
                    return this.$tool.getPositionInPage(el).top
                }
                
                const list = document.querySelectorAll('.J_catalogContent li')
                const len = this.titles.length
                const arr = this.titles
                let getPosition
                let before = Math.ceil(getScrollOffset().top)
                
                window.addEventListener('scroll', this.$tool.throttle(() => {
                    let scrollTop = Math.ceil(getScrollOffset().top)
                    if (scrollTop < before) {
                        getPosition = getPositionUp
                    } else {
                        getPosition = getPositionDown
                    }
                    before = scrollTop
                    if (scrollTop <= getPosition(arr[0])) {
                        addClass(list[0], 'catalog-item-active')
                        list[0].scrollIntoView()
                    } else {
                        removeClass(list[0], 'catalog-item-active')
                    }
                    for (let i = 1; i < len - 1; i++) {
                        if (scrollTop >= getPosition(arr[i]) && scrollTop < getPosition(arr[i + 1])) {
                            addClass(list[i], 'catalog-item-active')
                            list[i].scrollIntoView()
                        } else {
                            removeClass(list[i], 'catalog-item-active')
                        }
                    }
                    if (scrollTop >= getPosition(arr[len - 1])) {
                        addClass(list[len - 1], 'catalog-item-active')
                        list[len - 1].scrollIntoView()
                    } else {
                        removeClass(list[len - 1], 'catalog-item-active')
                    }
                }, 100))
            })
        }
    }
</script>
