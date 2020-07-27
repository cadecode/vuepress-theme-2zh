<template>
    <div class="head-container" ref="head">
        <div class="head-content clearfix">
            <div class="head-logo">
                <a href="/">
                    <img v-if="logo[0] === 'image'" :src="logo[1]">
                    <span v-if="logo[0] === 'text'">{{logo[1]}}</span>
                </a>
            </div>
            <div class="head-links">
                <el-row>
                    <el-col :xs="0" :sm="24">
                        <el-menu class="head-menu" :default-active="this.$route.path" mode="horizontal"
                                 @select="handleSelect">
                            <el-menu-item index="/">
                                <i class="el-icon-s-home" />
                                Index
                            </el-menu-item>
                            <el-menu-item index="/search/">
                                <i class="el-icon-search" />
                                Search
                            </el-menu-item>
                            <el-menu-item index="/about/">
                                <i class="el-icon-info" />
                                About
                            </el-menu-item>
                            <el-menu-item index="/links/">
                                <i class="el-icon-link" />
                                Links
                            </el-menu-item>
                        </el-menu>
                    </el-col>
                    <el-col :xs="24" :sm="0">
                        <el-menu class="head-menu" :default-active="$route.path" mode="horizontal"
                                 menu-trigger="click"
                                 @select="handleSelect">
                            <el-submenu class="head-menu-sub" index="submenu">
                                <template slot="title">Menu</template>
                                <el-menu-item index="/">
                                    <i class="el-icon-s-home" />
                                    Index
                                </el-menu-item>
                                <el-menu-item index="/search/">
                                    <i class="el-icon-search" />
                                    Search
                                </el-menu-item>
                                <el-menu-item index="/about/">
                                    <i class="el-icon-info" />
                                    About
                                </el-menu-item>
                                <el-menu-item index="/links/">
                                    <i class="el-icon-link" />
                                    Links
                                </el-menu-item>
                            </el-submenu>
                        </el-menu>
                    </el-col>
                </el-row>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Head",
        data() {
            return {
                favicon: '',
                logo: []
            }
        },
        methods: {
            handleSelect(index) {
                if (this.$route.path !== index) {
                    this.$router.push(index)
                }
            }
        },
        created() {
            // get data from themeConfig
            this.logo = this.$themeConfig.logo
            this.favicon = this.$themeConfig.favicon
        },
        beforeMount() {
            this.$nextTick(() => {
                // set scroll event
                let nav = this.$refs.head,
                    before = 0
                window.addEventListener('scroll', () => {
                    let now = this.$tool.getScrollOffset().top
                    if (now > before) {
                        if (now > 64) {
                            this.$tool.addClass(nav, 'head-hide')
                        }
                    } else {
                        this.$tool.removeClass(nav, 'head-hide')
                    }
                    before = now
                })
            })
        }
    }
</script>
