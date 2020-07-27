// import element ui
import 'element-ui/lib/theme-chalk/index.css'
import elementUI from './utils/elementUI'

// tool functions
import tool from './utils/tool'

// import bus
import bus from './utils/bus'

// import guard
import guard from './utils/routerGuard'

// import css
import './styles/palette.styl'
import './styles/global.styl'
import './styles/main.styl'
import './styles/markdown.styl'

export default ({Vue, router}) => {
    Vue.use(elementUI)
    Vue.use(bus)
    Vue.use(tool)
    Vue.use(guard, router)
}