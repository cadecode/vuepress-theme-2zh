module.exports = (themeConfig) => {
    // default config
    const defaultConfig = {
        logo: ['text', '2zh'],
        notice: [],
        pagination: 12,
        author: '2zh',
        links: [],
        domain: '',
        valine: []
    }
    for (let key in defaultConfig) {
        themeConfig[key] = themeConfig[key] || defaultConfig[key]
    }

    // pagination sort function
    function sorter(prev, next) {
        const prevPined = prev.frontmatter.pined
        const nextPined = next.frontmatter.pined
        if (!prevPined && !nextPined) {
            const day = require('dayjs')
            const prevDate = day(prev.frontmatter.date)
            const nextDate = day(next.frontmatter.date)
            return nextDate - prevDate
        } else if (!prevPined && nextPined) {
            return 1
        } else if (prevPined && !nextPined) {
            return -1
        } else {
            return prevPined - nextPined
        }
    }

    const pluginConfig = {
        plugins: [
            [
                '@vuepress/plugin-blog',
                {
                    directories: [
                        {
                            id: 'post',
                            dirname: 'post',
                            path: '/',
                            frontmatter: {
                                title: 'Index',
                                layout: 'Index'
                            },
                            itemLayout: 'Post',
                            itemPermalink: '/post/:slug',
                            pagination: {
                                lengthPerPage: themeConfig.pagination,
                                layout: 'Index',
                                getPaginationPageTitle: (num) => {
                                    return `${num} - Index`
                                },
                                sorter
                            }
                        }
                    ],
                    frontmatters: [
                        {
                            id: 'tag',
                            keys: ['tag'],
                            path: '/search/',
                            frontmatter: {
                                title: 'Search',
                                layout: 'Search'
                            },
                            title: '- Search',
                            scopeLayout: 'Tag',
                            pagination: {
                                lengthPerPage: Infinity,
                                sorter
                            }
                        }
                    ],
                    sitemap: themeConfig.domain && {
                        hostname: themeConfig.domain
                    },
                    feed: themeConfig.domain && {
                        canonical_base: themeConfig.domain,
                    }
                }
            ],
            [
                '@vuepress/plugin-search',
                {
                    searchMaxSuggestions: 10
                }
            ],
            [
                '@vuepress/plugin-medium-zoom',
                {
                    selector: '.component-content img',
                    delay: 1000,
                    options: {
                        background: 'rgba(0, 0, 0, .5)'
                    }
                }
            ],
            themeConfig.valine.length > 1 && [
                'vuepress-plugin-comment',
                {
                    choosen: 'valine',
                    options: {
                        el: '#valine-vuepress-comment',
                        appId: themeConfig.valine[0],
                        appKey: themeConfig.valine[1]
                    }
                }
            ]
        ]
    }
    return pluginConfig
}
