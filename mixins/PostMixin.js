import 'katex/dist/katex.min.css'

let mermaid

let latexRender
let latexConfig = {
    delimiters:
        [
            {left: "$$", right: "$$", display: true},
            {left: "$", right: "$", display: false}
        ],
    strict: false
}

function mermaidStarter(vm) {
    if (mermaid) {
        vm.$nextTick(() => {
            mermaid.init({noteMargin: 10}, ".language-mermaid>pre>code")
        })
    } else {
        import('mermaid/dist/mermaid.min').then((module) => {
            mermaid = module
            vm.$nextTick(() => {
                mermaid.init({noteMargin: 10}, ".language-mermaid>pre>code")
            })
        })
    }
}

function katexStarter(vm) {
    if (latexRender) {
        vm.$nextTick(() => {
            latexRender(document.getElementsByClassName('markdown-content')[0], latexConfig)
        })
    } else {
        import('katex/dist/contrib/auto-render.min').then((module) => {
            latexRender = module.default
            vm.$nextTick(() => {
                latexRender(document.getElementsByClassName('markdown-content')[0], latexConfig)
            })
        })
    }
}

export default {
    name: 'PostMix',
    beforeMount() {
        const use = this.$frontmatter.use
        if (use) {
            setTimeout(() => {
                if (Array.isArray(use)) {
                    use.includes('mermaid') && mermaidStarter(this)
                    use.includes('latex') && katexStarter(this)
                } else if (use === 'mermaid') {
                    mermaidStarter(this)
                } else if (use === 'latex') {
                    katexStarter(this)
                }
            }, 500)
        }
    }
}
