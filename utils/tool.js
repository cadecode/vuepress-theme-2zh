const tool = {
    // judge have class or not
    hasClass(el, str) {
        let reg = new RegExp('\\b' + str + '\\b(?!-)'),
            className = el.className
        return reg.test(className)
    },

    // add or remove class
    addClass(el, str) {
        let reg = new RegExp('\\b' + str + '\\b(?!-)'),
            className = el.className
        if (!reg.test(className)) {
            el.className = (className + ' ' + str).trim()
        }
    },

    removeClass(el, str) {
        let reg = new RegExp('\\b' + str + '\\b(?!-)'),
            className = el.className
        if (reg.test(className)) {
            el.className = className.replace(reg, '').trim()
        }
    },

    toggleClass(el, str) {
        let reg = new RegExp('\\b' + str + '\\b(?!-)'),
            className = el.className
        if (reg.test(className)) {
            el.className = className.replace(reg, '').trim()
        } else {
            el.className = (className + ' ' + str).trim()
        }
    },

    // get scrollbar position
    getScrollOffset() {
        if (window.pageXOffset) {
            return {
                top: window.pageYOffset,
                left: window.pageXOffset
            }
        } else return {
            top: document.body.scrollTop || document.documentElement.scrollTop,
            left: document.body.scrollLeft || document.documentElement.scrollLeft
        }
    },

    // get element position
    getPositionInPage: function (el) {
        let parent = el.offsetParent
        let top = el.offsetTop
        let left = el.offsetLeft
        while (parent) {
            top += parent.offsetTop
            left += parent.offsetLeft
            parent = parent.offsetParent
        }
        return {
            top: top,
            left: left
        }
    },

    // scroll to the position
    scrollTo(destination) {
        if (!window.requestAnimationFrame) {
            window.requestAnimationFrame = function (fn) {
                return setTimeout(fn, 17)
            }
        }
        let scrollTop = this.getScrollOffset().top
        const step = function () {
            scrollTop = scrollTop + (destination - scrollTop) / 5
            if (Math.abs(destination - scrollTop) < 1) {
                window.scrollTo(0, destination)
                return
            }
            window.scrollTo(0, scrollTop)
            requestAnimationFrame(step)
        }
        step()
    }
}


export default {
    install(Vue) {
        Vue.prototype.$tool = tool
    }
}
