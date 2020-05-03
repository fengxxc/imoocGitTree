const Node = require('./node.js')

class View {
    static getRenderString(root, splitChar, curPath) {
        curPath = Node.removeUrlHash(curPath)
        if (curPath.startsWith(splitChar)) {
            curPath = curPath.slice(splitChar.length)
        }
        let pathArr = curPath.split(splitChar)

        let arr = [root.val]
        return Node._toTreeString(
            root
            , ''
            , node => {
                if (pathArr.length >= 0 && pathArr[0] == node.val) {
                    pathArr.shift()
                    return `<a href="${arr.push(node.val), arr.join('/')}" class="imt-mark">${node.val}</a>`
                }
                return `<a href="${arr.push(node.val), arr.join('/')}">${node.val}</a>`
            }
            , () => arr.pop()
        )
    }

    static getStyleHTML() {
        return `
            <style>
                .imooc-tree-switch {
                    position: fixed;
                    top: 4px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-direction: column;
                    width: 42px;
                    height: 42px;
                    background-color: white;
                    border-radius: 50% ;
                    transition: transform 250ms ease;
                    cursor: pointer;
                    z-index: 200;
                }
                .imooc-tree-switch span {
                    position: relative;
                    display: block;
                    width: 50%;
                    height: 2px;
                    /* background-color: #444; */
                    background-color: transparent;
                    float: left;
                    transform-origin: center center;
                    transition: transform 250ms ease;
                    z-index: 200;
                } 

                .imooc-tree-switch span:nth-of-type(1) { 
                    /* transform: translateY(-5px);  */
                    width: 30%;
                    height: 20%;
                    border-left: 2px black solid;
                    border-bottom: 2px black solid;
                    border-radius: 0 0 0 5px;
                } 
                .imooc-tree-switch span:nth-of-type(2) {
                    width: 30%;
                    height: 20%;
                    border-left: 2px black solid;
                    border-bottom: 2px black solid;
                    transform: translateX(3px);
                    border-radius: 0 0 0 5px;
                }
                .imooc-tree-switch span:nth-of-type(3) { 
                    width: 25%;
                    height: 20%;
                    border-left: 2px black solid;
                    border-bottom: 2px black solid;
                    transform: translateX(6px);
                    border-radius: 0 0 0 5px;
                } 
                #imoocTreeSwitch {
                    display: none;
                }
                #imoocTreeSwitch:checked ~ .imooc-tree-switch {
                    background-color: transparent;
                    transform: rotate(360deg);
                    transition: transform 250ms ease;
                }
                #imoocTreeSwitch:checked ~ .imooc-tree-switch span {
                    background-color: white;
                    transition: transform 250ms ease;
                }
                #imoocTreeSwitch:checked ~ .imooc-tree-switch span:nth-of-type(1) {
                    transform: translateY(1px) rotate(45deg);
                    width: 50%;
                    height: 2px;
                    background-color: black;
                    border: none;
                }
                #imoocTreeSwitch:checked ~ .imooc-tree-switch span:nth-of-type(2) {
                    display: none;
                }
                #imoocTreeSwitch:checked ~ .imooc-tree-switch span:nth-of-type(3) {
                    transform: translateY(-1px) rotate(-45deg);
                    width: 50%;
                    height: 2px;
                    background-color: black;
                    border: none;
                }
                #imoocTreeSwitch:checked ~ #imoocTree {
                    left: 0px;
                    transition: left 500ms ease;
                }
                #imoocTree {
                    position: fixed;
                    padding-top: 44px;
                    left: -360px;
                    width: 360px;
                    overflow: auto;
                    height: 100%;
                    background-color: #f3f5f6;
                    transition: left 500ms ease;
                }
                #imoocTreeSwitch:checked ~ .full.height {
                    /* transform: translateX(360px); */
                    margin-left: 360px;
                    transition: margin-left 500ms ease;
                }
                .full.height {
                    /* transform: translateX(0px) */;
                    margin-left: 0px;
                    transition: margin-left 500ms ease;
                }
                .imt-mark {
                    color: #3dc73a;
                }
            </style>
        `.trim()
    }

    static getSwitchBtnHTML() {
        return `
            <input type="checkbox" id="imoocTreeSwitch">
            <label for="imoocTreeSwitch" class="imooc-tree-switch" title="imoocGitTree">
                <span></span>
                <span></span>
                <span></span>
            </label>
        `.trim()
    }

    static getTreeHTML(rstr) {
        return `<pre id="imoocTree">${rstr}</pre>`
    }

    static render(root, splitChar, curPath) {
        // render
        const htmlstr = View.getStyleHTML()
                        + View.getSwitchBtnHTML()
                        + View.getTreeHTML(View.getRenderString(root, splitChar, curPath))
        document.querySelector('body').insertAdjacentHTML('afterbegin', htmlstr);

    }
}


module.exports = View