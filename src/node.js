class Node {
    constructor(val, childs) {
        this._val = val || ''
        this._isLeaf = Node.checkIsLeaf(val)
        this._firstLeafChildIndex = -1
        this._childs = childs || [] // Node[]
        this._val2ChildIndexMap = new Map()
        this._childs.forEach((n, i) => this.setVal2ChildIndexMap(n.val, i))
    }

    get val() {return this._val}
    set val(v) {this._val = v}
    get isLeaf() {return this._isLeaf}
    set isLeaf(is) {this._isLeaf = is}
    get firstLeafChildIndex() {return this._firstLeafChildIndex}
    set firstLeafChildIndex(i) {this._firstLeafChildIndex = i}
    get childs() {return this._childs}
    set childs(c) {this._childs = c}

    getVal2ChildIndexMap() {
        return this._val2ChildIndexMap
    }

    setVal2ChildIndexMap(val, index) {
        this._val2ChildIndexMap.set(val, index)
    }

    getChildByIndex(index) {
        return this._childs[index]
    }

    getChildByVal(val) {
        return this._childs[this._val2ChildIndexMap.get(val)]
    }

    deleteChildByVal(val) {
        this._childs.splice([this._val2ChildIndexMap.get(val)], 1)
    }
    
    hasChildVal(val) {
        return this._val2ChildIndexMap.has(val)
    }

    hasChild(node) {
        return this.hasChildVal(node.val)
    }
    
    putChild(node) {
        if (this.hasChild(node)) {
            return this.getChildByVal(node.val)
        }

        let index = -1
        if (node.isLeaf) {
            if (this.firstLeafChildIndex == -1) {
                this.firstLeafChildIndex = this.childs.length
            }
            this._childs.push(node)
            index = this.childs.length - 1
        } else {
            if (this.firstLeafChildIndex != -1) {
                this._childs.splice(this.firstLeafChildIndex, 0, node)
                this.firstLeafChildIndex ++
                index = this.firstLeafChildIndex
            } else {
                this._childs.push(node)
                index = this.childs.length - 1
            }
        }
        this.setVal2ChildIndexMap(node.val, index)
        return node
    }

    static _toTreeString(root, leftStr, preNodeFun, postNodeFun) {
        const BRANCH = '├─ '
        // const LAST_BRANCH = '└─ '
        const LAST_BRANCH = '╰─ '
        const TAB = '│  '
        const EMPTY_TAB = '   '
        const BR = '\n'
        let result = []
        for (let i = 0; i < root.childs.length; i++) {
            const child = root.childs[i];
            const _val = preNodeFun ? preNodeFun(child) : child.val
            const isEnd = i == root.childs.length - 1
            result.push(leftStr + (isEnd? LAST_BRANCH : BRANCH) + _val + BR)
            result.push(Node._toTreeString(child, leftStr + (isEnd? EMPTY_TAB: TAB), preNodeFun, postNodeFun))
            postNodeFun ? postNodeFun(child) : null
        }
        return result.join('')
    }

    toString() {
        return Node._toTreeString(this, [])
    }

    static _toJson(root) {
        return {
            val: root.val,
            firstLeafChildIndex: root.firstLeafChildIndex,
            childs: ((cs) => cs.map(c => Node._toJson(c)))(root.childs)
        }
    }

    toJson() {
        return Node._toJson(this)
    }

    toJsonString() {
        return JSON.stringify(this.toJson())
    }

    static checkIsLeaf(val) {
        return val.search(/\./) > 0 // 'xxx' | '.xxx' is path, 'x.xxx' is file
    }

    static buildByPathString(root, splitChar, fullPath, preNodeFun) {
        if (fullPath.lastIndexOf('#') > -1) {
            fullPath = fullPath.slice(0, fullPath.lastIndexOf('#'))
        }
        const valArr = fullPath.split(splitChar)
        for (let i = 0, parent = root; i < valArr.length; i++) {
            if (valArr[i] == '') continue
            let node = new Node(valArr[i], [])
            if (preNodeFun) {
                node = preNodeFun(node, (i == valArr.length - 1))
            }
            if (parent.hasChildVal(valArr[i]) && node.childs.length > 0) {
                // 有后代，就：新旧交集部分保留为旧的后代；旧有、新没有的删掉；旧没有、新有的添加
                const oldNode = parent.getChildByVal(valArr[i])
                const newVal2ChildIndexMap = node.getVal2ChildIndexMap()
                oldNode.getVal2ChildIndexMap().forEach((index, val) => {
                    // 旧有、新没有的删掉
                    if (!newVal2ChildIndexMap.has(val)) {
                        oldNode.deleteChildByVal(val)
                    }
                })
                // 旧没有、新有的添加
                newVal2ChildIndexMap.forEach((index, val) => {
                    oldNode.putChild(node.getChildByVal(val))
                })
            } else {
                // 没有后代
                parent = parent.putChild(node)
            }
        }
    }

    static buildByJson(json) {
        return new Node(
            json.val
            , json.childs.map(j => Node.buildByJson(j))
        )
    }
}

module.exports = Node