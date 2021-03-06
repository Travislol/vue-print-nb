'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _printarea = require('./printarea.js');

var _printarea2 = _interopRequireDefault(_printarea);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  directiveName: 'print',
  bind: function bind(el, binding, vnode) {
    var vue = vnode.context;
    var closeBtn = true;
    el.addEventListener('click', function (event) {
      var hkey_path;
      hkey_path = "HKEY_CURRENT_USER\\Software\\Microsoft\\Internet Explorer\\PageSetup\\";
      try {
      var RegWsh = new ActiveXObject("WScript.Shell");
      RegWsh.RegWrite(hkey_path + "header", "");
      RegWsh.RegWrite(hkey_path + "footer", "");
      } catch (e) {
      }
      
      if (binding.value) {
        localPrint();
      } else {
        window.print();
      }
    });

    var localPrint = function localPrint() {
      vue.$nextTick(function () {
        if (closeBtn) {
          closeBtn = false;
          var print = new _printarea2.default({
            el: binding.value,
            endCallback: function endCallback() {
              closeBtn = true;
            }
          });
        }
      });
    };
  },
  update: function update(el, binding) {},
  unbind: function unbind(el) {}
};