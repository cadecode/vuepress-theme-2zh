<template>
    <div class="catalog-container" v-show="show">
        <div class="catalog-content catalog-hide J_catalog-content" v-if="headers.length!==0">
            <ul>
                <li v-for="(item, index) in headers" :key="index"
                    @click="clickHeaders(index)"
                    :class="`catalog-item-${item.level}`">
                    {{item.title}}
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
                // catalog hide or show
                window.addEventListener('scroll', () => {
                    this.show = this.$tool.getScrollOffset().top > 200;
                })
                setTimeout(() => {
                    // catalog follow scroll
                    const getPositionInPage = this.$tool.getPositionInPage
                    const hElements = document.querySelectorAll('.J_markdown-content h2,.J_markdown-content h3')
                    ;[].forEach.call(hElements, (item) => {
                        this.heights.push(getPositionInPage(item).top - 70)
                    })
                    const list = document.querySelectorAll('.J_catalog-content li')
                    const arr = this.heights
                    const len = arr.length
                    window.addEventListener('scroll', () => {
                        const scrollTop = this.$tool.getScrollOffset().top
                        for (let i = 0; i < len - 1; i++) {
                            if (scrollTop >= arr[i] && scrollTop < arr[i + 1]) {
                                this.$tool.addClass(list[i], 'catalog-item-active')
                                list[i].scrollIntoView()
                            } else {
                                this.$tool.removeClass(list[i], 'catalog-item-active')
                            }
                            if (scrollTop >= arr[len - 1]) {
                                this.$tool.addClass(list[len - 1], 'catalog-item-active')
                                list[i].scrollIntoView()
                            } else {
                                this.$tool.removeClass(list[len - 1], 'catalog-item-active')
                            }
                        }
                    })
                }, 1000)
            })
        }
    }
</script>
