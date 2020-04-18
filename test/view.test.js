const expect = require('chai').expect
const Node = require('../src/node.js')
const View = require('../src/view.js')

describe('view测试', () => {
    
    it('getRenderString', () => {
        let root = new Node('https://git.imooc.com')
        Node.buildByPathString(root, '/', 'fengxxc/romantics/src/master/TinyScript')
        Node.buildByPathString(root, '/', 'fengxxc/romantics/src/master/TinyScript/java/src/main/java')
        Node.buildByPathString(root, '/', 'fengxxc/romantics/src/master/TinyScript/java/src/main/java/lexer/Lexer.java')
        Node.buildByPathString(root, '/', 'fengxxc/romantics/src/master/TinyScript/java/src/main/java/lexer/Token.java')
        Node.buildByPathString(root, '/', 'fengxxc/romantics/src/master/TinyScript/java/src/main/java/parser/Parser.java')
        Node.buildByPathString(root, '/', 'fengxxc/romantics/src/master/TinyScript/js/src/lexer/Token.js#L8')
        const renderStr = View.getRenderString(root)
        // console.log(renderStr)
        const realStr = '╰─ <a href="https://git.imooc.com/fengxxc">fengxxc</a>\n' +
                        '   ╰─ <a href="https://git.imooc.com/fengxxc/romantics">romantics</a>\n' +
                        '      ╰─ <a href="https://git.imooc.com/fengxxc/romantics/src">src</a>\n' +
                        '         ╰─ <a href="https://git.imooc.com/fengxxc/romantics/src/master">master</a>\n' +
                        '            ╰─ <a href="https://git.imooc.com/fengxxc/romantics/src/master/TinyScript">TinyScript</a>\n' +
                        '               ├─ <a href="https://git.imooc.com/fengxxc/romantics/src/master/TinyScript/java">java</a>\n' +
                        '               │  ╰─ <a href="https://git.imooc.com/fengxxc/romantics/src/master/TinyScript/java/src">src</a>\n' +
                        '               │     ╰─ <a href="https://git.imooc.com/fengxxc/romantics/src/master/TinyScript/java/src/main">main</a>\n' +
                        '               │        ╰─ <a href="https://git.imooc.com/fengxxc/romantics/src/master/TinyScript/java/src/main/java">java</a>\n' +
                        '               │           ├─ <a href="https://git.imooc.com/fengxxc/romantics/src/master/TinyScript/java/src/main/java/lexer">lexer</a>\n' +
                        '               │           │  ├─ <a href="https://git.imooc.com/fengxxc/romantics/src/master/TinyScript/java/src/main/java/lexer/Lexer.java">Lexer.java</a>\n' +
                        '               │           │  ╰─ <a href="https://git.imooc.com/fengxxc/romantics/src/master/TinyScript/java/src/main/java/lexer/Token.java">Token.java</a>\n' +
                        '               │           ╰─ <a href="https://git.imooc.com/fengxxc/romantics/src/master/TinyScript/java/src/main/java/parser">parser</a>\n' +
                        '               │              ╰─ <a href="https://git.imooc.com/fengxxc/romantics/src/master/TinyScript/java/src/main/java/parser/Parser.java">Parser.java</a>\n' +
                        '               ╰─ <a href="https://git.imooc.com/fengxxc/romantics/src/master/TinyScript/js">js</a>\n' +
                        '                  ╰─ <a href="https://git.imooc.com/fengxxc/romantics/src/master/TinyScript/js/src">src</a>\n' +
                        '                     ╰─ <a href="https://git.imooc.com/fengxxc/romantics/src/master/TinyScript/js/src/lexer">lexer</a>\n' +
                        '                        ╰─ <a href="https://git.imooc.com/fengxxc/romantics/src/master/TinyScript/js/src/lexer/Token.js">Token.js</a>\n'
        expect(renderStr).to.be.equal(realStr)

    })

})