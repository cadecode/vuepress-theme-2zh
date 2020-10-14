<template>
    <div class="catalog-container" v-show="show">
        <div class="catalog-content catalog-hide J_catalog-content" v-if="headers.length!==0">
            <ul>
                <li v-for="(item, index) in headers" :key="index"
                    @click="clickHeaders(index)"
                    :class="`catalog-item-${item.level}`">
                    {{ item.title }}
                </li>
            </ul>
        </div>
        <div class='catalog-open' v-if="this.$frontmatter.layout === 'Post'" @click="openAnchor">
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
                heights: [],
                show: false
            }
        },
        methods: {
            clickHeaders(index) {
                this.$tool.scrollTo(this.heights[index])
            },
            openAnchor() {
                const catalog = document.getElementsByClassName('J_catalog-content')[0]
                this.$tool.toggleClass(catalog, 'catalog-hide')
            }
        },
        mounted() {
            // catalog item
            this.headers = this.$page.headers || []
            this.$nextTick(() => {
                const getPositionInPage = this.$tool.getPositionInPage
                const getScrollOffset = this.$tool.getScrollOffset
                const addClass = this.$tool.addClass
                const removeClass = this.$tool.removeClass
                
                // catalog hide or show
                window.addEventListener('scroll', () => {
                    this.show = getScrollOffset().top > 200;
                })
                // catalog follow scroll
                Array.prototype.forEach.call(
                    document.querySelectorAll('.J_markdownContent h2,.J_markdownContent h3'),
                    (item) => {
                        this.heights.push(getPositionInPage(item).top - 70)
                    })
                const list = document.querySelectorAll('.J_catalog-content li')
                const arr = this.heights
                const len = arr.length
                window.addEventListener('scroll', () => {
                    const scrollTop = getScrollOffset().top
                    for (let i = 0; i < len - 1; i++) {
                        if (scrollTop >= arr[i] && scrollTop < arr[i + 1]) {
                            addClass(list[i], 'catalog-item-active')
                            list[i].scrollIntoView()
                        } else {
                            removeClass(list[i], 'catalog-item-active')
                        }
                        if (scrollTop >= arr[len - 1]) {
                            addClass(list[len - 1], 'catalog-item-active')
                            list[i].scrollIntoView()
                        } else {
                            removeClass(list[len - 1], 'catalog-item-active')
                        }
                    }
                })
            })
        }
    }
</script>
