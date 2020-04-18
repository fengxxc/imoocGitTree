const Node = require('./node.js')

class View {
    static getRenderString(root) {
        let arr = [root.val]
        return Node._toTreeString(root, ''
            , node => `<a href="${arr.push(node.val), arr.join('/')}">${node.val}</a>`
            , () => arr.pop()
        )
    }

    static render(root) {
        // render
        const rstr = View.getRenderString(root)
        const htmlstr = `<pre>${rstr}</pre>`
        const themContainerDom = document.querySelector('.full.height')
        let gitTreeDom = document.querySelector('gitTree')
        if (!gitTreeDom) {
            gitTreeDom = document.createElement('aside')
            gitTreeDom.id = 'gitTree'
            document.querySelector('body').insertBefore(gitTreeDom, themContainerDom)
        }
        gitTreeDom.innerHTML = htmlstr

        // style hack
        const left = document.querySelector('.ui.container').offsetLeft
        themContainerDom.style.marginLeft = left + 'px'
        gitTreeDom.style.position = 'fixed'
        gitTreeDom.style.width = left + 'px'
        gitTreeDom.style.backgroundColor = '#FFF'
        gitTreeDom.style.overflow = 'auto'
        gitTreeDom.style.height = '100%'
    }
}


module.exports = View