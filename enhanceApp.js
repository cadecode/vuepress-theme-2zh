// import element ui
import 'element-ui/lib/theme-chalk/index.css'
import elementUI from './utils/ui'

// tool functions
import tool from './utils/tool'

// import bus
import bus from './utils/bus'

// import guard
import guard from './utils/guard'

// import css
import './styles/palette.styl'
import './styles/global.styl'
import './styles/main.styl'
import './styles/markdown.styl'
import './styles/plugins.styl'

export default ({Vue, router}) => {
    Vue.use(elementUI)
    Vue.use(bus)
    Vue.use(tool)
    Vue.use(guard, router)
}