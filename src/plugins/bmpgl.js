// bmpgl.js
/* export function BMPGL(ak) {
    return new Promise(function(resolve, reject) {
        window.init = function() {
            // eslint-disable-next-line
            resolve(BMapGL)
        }
        const script = document.createElement('script')
        script.type = 'text/javascript'
        script.src = `http://api.map.baidu.com/api?v=1.0&type=webgl&ak=P0aw3mz8OoP7Lekoa1eMTBDbNZXqzTf1&callback=init`
        script.onerror = reject
        document.head.appendChild(script)
    })
} */

export function BMPGL() {
    return new Promise(function(resolve, reject) {
        window.init = function() {
            // eslint-disable-next-line
            resolve(BMapGL)
        }
        const script = document.createElement('script')
        script.type = 'text/javascript'
        script.src = `http://api.map.baidu.com/api?v=1.0&type=webgl&ak=P0aw3mz8OoP7Lekoa1eMTBDbNZXqzTf1&callback=init`
        script.onerror = reject
        document.head.appendChild(script)
    })
}