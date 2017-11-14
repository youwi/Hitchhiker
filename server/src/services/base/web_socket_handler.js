"use strict";
exports.__esModule = true;
var log_1 = require("../../utils/log");
var WebSocketHandler = /** @class */ (function () {
    function WebSocketHandler() {
        var _this = this;
        this.handle = function (socket) {
            _this.socket = socket;
            _this.init();
            socket.on('message', function (data) { return _this.onReceive(data); });
            socket.on('close', function () { return _this.onClose(); });
        };
        this.send = function (data) {
            _this.socket.send(data);
        };
        this.close = function (data) {
            _this.socket.close(1000, data);
        };
    }
    WebSocketHandler.prototype.init = function () {
        log_1.Log.info('ws init');
    };
    return WebSocketHandler;
}());
exports.WebSocketHandler = WebSocketHandler;
