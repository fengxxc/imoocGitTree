const expect = require('chai').expect
const Node = require('../src/node.js')



describe('Node测试', () => {
    let root = new Node('root')
    
    it('init', () => {
        Node.buildByPathString(root, '/', 'aa/b1')
        Node.buildByPathString(root, '/', 'aa/b1/cc')
        Node.buildByPathString(root, '/', 'aa/b2/xx')
        Node.buildByPathString(root, '/', 'aa/b2/y.y')
        Node.buildByPathString(root, '/', 'aa/b1/dd')
        expect(root.val).to.be.equal('root')
        expect(root.childs.map(c => c.val)).to.be.deep.equal(['aa'])
        expect(root.childs[0].childs.map(c => c.val)).to.be.deep.equal(['b1', 'b2'])
    })
    
    it('toString', () => {
        const str = '╰─ aa\n' + 
                    '   ├─ b1\n' +
                    '   │  ├─ cc\n' +
                    '   │  ╰─ dd\n' +
                    '   ╰─ b2\n' +
                    '      ├─ xx\n' +
                    '      ╰─ y.y\n'
        // console.log(root.toString())
        expect(root.toString()).to.be.equal(str)

        const expStr = Node._toTreeString(root, '', n => {
            return '[' + n.val + ']'
            // return '[' + v + ']'
        })
        const st2 = '╰─ [aa]\n' + 
                    '   ├─ [b1]\n' +
                    '   │  ├─ [cc]\n' +
                    '   │  ╰─ [dd]\n' +
                    '   ╰─ [b2]\n' +
                    '      ├─ [xx]\n' +
                    '      ╰─ [y.y]\n'
        expect(expStr).to.be.equal(st2)
    })

    it('toJson', () => {
        expect(root.toJson().childs[0].childs[1].val).to.be.equal('b2')
    })

    it('toJsonString', () => {
        expect(root.getChildByIndex(0).getChildByIndex(1).getChildByIndex(0).toJsonString()).to.be.equal('{"val":"xx","firstLeafChildIndex":-1,"childs":[]}')
    })

    it('buildByJson', () => {
        const json = {
            val: 'foo',
            firstLeafChildIndex: -1,
            childs: [
                {
                    val: 'bar.exe',
                    firstLeafChildIndex: -1,
                    childs: []
                }
            ]
        }
        expect(Node.buildByJson(json).getChildByIndex(0).val).to.be.equal('bar.exe')
        expect(Node.buildByJson(json).getChildByIndex(0).isLeaf).to.be.true
    })

    it('buildByPathString', () => {
        const root = new Node('root', [])
        const ps1 = 'aa/bb/cc/xx.yy'
        const ps2 = 'aa/bb/cc'
        const ps3 = 'aa'
        const subPs2 = ['ll.ll', 'mm', 'nn']
        Node.buildByPathString(root, '/', ps1)
        Node.buildByPathString(root, '/', ps2, (node, isEndPath) => {
            if (isEndPath) {
                subPs2.forEach(p => node.putChild(new Node(p, [])))
            }
            return node
        })
        Node.buildByPathString(root, '/', ps3)
        // console.log(root.toString())
        const expStr =  '╰─ aa\n' +
                        '   ╰─ bb\n' +
                        '      ╰─ cc\n' +
                        '         ├─ mm\n' +
                        '         ├─ nn\n' +
                        '         ╰─ ll.ll\n'
        expect(root.toString()).to.be.equal(expStr)
    })

    it('buildByJson with buildByPathString', () => {
        const json = {
            val: 'root',
            firstLeafChildIndex: -1,
            childs: [{
                val: 'foo',
                firstLeafChildIndex: -1,
                childs: [{
                    val: 'bar.exe',
                    firstLeafChildIndex: -1,
                    childs: []
                }]
            }]
        }
        const root = Node.buildByJson(json)
        Node.buildByPathString(root, '/', 'aa/bb/cc.c')
        const subPs = ['ll.ll', 'mm', 'nn']
        Node.buildByPathString(root, '/', 'foo', (node, isEndPath) => {
            if (isEndPath) {
                subPs.forEach(p => node.putChild(new Node(p, [])))
            }
            return node
        })
        // console.log(root.toString())
        const expStr =  '├─ foo\n' +
                        '│  ├─ mm\n' +
                        '│  ├─ nn\n' +
                        '│  ╰─ ll.ll\n' +
                        '╰─ aa\n' +
                        '   ╰─ bb\n' +
                        '      ╰─ cc.c\n'
        expect(root.toString()).to.be.equal(expStr)
    })
})