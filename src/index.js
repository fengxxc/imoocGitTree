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
    const pathname = location.pathname
    
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
    View.render(root)
    
    
}

main()

module.exports = {
    main: main
}