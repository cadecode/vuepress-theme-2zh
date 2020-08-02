module.exports = {
    evergreen: true,
    locales: {
        '/': {
            lang: 'zh-CN',
            title: '2zh',
            description: 'a blog powered by vuepress'
        }
    },
    head: [
        ['link', {rel: 'icon', href: '/meta/favicon.ico'}]
    ],
    theme: require.resolve('../../'),
    themeConfig: {
        domain: 'http://localhost/ ',
        notice: [
            {
                text: 'vuepress 博客主题 2zh 开源地址',
                url: 'https://github.com/cadecode/vuepress-theme-2zh'
            },
            {
                text: 'vuepress 官方文档',
                url: 'https://www.vuepress.cn/'
            },
            {
                text: 'vue 官方文档',
                url: 'https://cn.vuejs.org/v2/guide/'
            }
        ],
        links: [
            {text: 'Github', url: 'https://github.com'},
            {text: 'Email', url: 'https://mail.foxmail.com'},
            {text: 'Weibo', url: 'https://weibo.com/'},
            {text: 'Facebook', url: 'https://www.facebook.com'},
        ]
    }
}
