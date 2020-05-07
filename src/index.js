const Node = require('./node.js')
const View = require('./view.js')


const main = () => {
    const location = window.location
    // get cache
    const cache = window.localStorage.getItem('imoocGitTreeCache')
    let root = null // Node
    if (!cache) {
        root = new Node(location.origin)
        window.localStorage.setItem('imoocGitTreeCache', root)
    } else {
        root = Node.buildByJson(JSON.parse(cache))
    }
    let pathname = location.pathname
    
    // addPath
    const subPaths = document.querySelectorAll('#repo-files-table td.name')
    if (subPaths) {
        Node.buildByPathString(root, '/', pathname, (node, isEndPath) => {
            if (isEndPath) {
                subPaths.forEach(e => node.putChild(new Node(e.innerText.trim(), [])))
                subPaths.forEach(e => console.log('find: ' + e.innerText.trim()))
            }
            return node
        })
    } else {
        Node.buildByPathString(root, '/', pathname)
    }
    

    // update cache
    window.localStorage.setItem('imoocGitTreeCache', root.toJsonString())

    // render
    View.render(root, '/', pathname)
    
    // 显示/隐藏树
    const toggleTree = () => {
        const switchDom = document.getElementById('imoocTreeSwitch')
        switchDom.checked = !switchDom.checked
    }

    // 监听 ctrl + shift + x 事件，用于显示/隐藏树
    document.onkeydown = function(e) {
        //获取键盘的keyCode值
        var keyCode = e.keyCode || e.which || e.charCode
        //获取ctrl 键对应的事件属性
        var ctrlKeyCode = e.ctrlKey || e.metaKey
        var shiftKeyCode = e.shiftKey
        if (keyCode == 88 && ctrlKeyCode && shiftKeyCode) {
            toggleTree()
        }
    }
}

main()

module.exports = {
    main: main
}