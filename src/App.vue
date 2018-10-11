<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  import './css/app.css'
  import './css/common.css'

  export default {
    name: "app",
    mounted() {
        let self = this;

        var fun = function(doc, win) {
            var docEl = doc.documentElement,
            resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
            recalc = function() {
                var clientWidth = docEl.clientWidth > 640 ? 640 : docEl.clientWidth;
                if (!clientWidth) return;
    
                //这里是假设在640px宽度设计稿的情况下，1rem = 10px；
                //可以根据实际需要修改
                docEl.style.fontSize = 100 * (clientWidth / 640) + 'px';
            };
            if (!doc.addEventListener) return;
            win.addEventListener(resizeEvt, recalc, false);
            doc.addEventListener('DOMContentLoaded', recalc, false);
        }
        fun(document, window);
    },
  };
</script>


