const Node = require('./node.js')

class View {
    static getRenderString(root) {
        let arr = [root.val]
        return Node._toTreeString(root, ''
            , node => `<a href="${arr.push(node.val), arr.join('/')}">${node.val}</a>`
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
                    background-color: #444 !important;
                    float: left;
                    transform-origin: center center;
                    transition: transform 250ms ease;
                    z-index: 200;
                } 

                .imooc-tree-switch span:nth-of-type(1) { 
                    transform: translateY(-5px); 
                } 
                .imooc-tree-switch span:nth-of-type(3) { 
                    transform: translateY(5px); 
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
                }
                #imoocTreeSwitch:checked ~ .imooc-tree-switch span:nth-of-type(2) {
                    display: none;
                }
                #imoocTreeSwitch:checked ~ .imooc-tree-switch span:nth-of-type(3) {
                    transform: translateY(-1px) rotate(-45deg);
                }
                #imoocTreeSwitch:checked ~ #imoocTree {
                    left: 0px;
                    transition: left 500ms ease;
                }
                #imoocTree {
                    position: fixed;
                    padding-top: 44px;
                    left: -271px;
                    width: 271px;
                    overflow: auto;
                    height: 100%;
                    background-color: "#f3f5f6";
                    transition: left 500ms ease;
                }
                #imoocTreeSwitch:checked ~ .full.height {
                    transform: translateX(271px);
                    transition: transform 500ms ease;
                }
                .full.height {
                    transform: translateX(0px);
                    transition: transform 500ms ease;
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

    static render(root) {
        // render
        const htmlstr = View.getStyleHTML()
                        + View.getSwitchBtnHTML()
                        + View.getTreeHTML(View.getRenderString(root))
        document.querySelector('body').insertAdjacentHTML('afterbegin', htmlstr);

    }
}


module.exports = View