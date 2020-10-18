import {
    Row,
    Col,
    Menu,
    Submenu,
    MenuItem,
    Card,
    Pagination,
    Backtop,
    Icon
} from 'element-ui'

export default {
    install(Vue) {
        Vue.use(Row)
        Vue.use(Col)
        Vue.use(Menu)
        Vue.use(Submenu)
        Vue.use(MenuItem)
        Vue.use(Card)
        Vue.use(Pagination)
        Vue.use(Backtop)
        Vue.use(Icon)
    }
}
