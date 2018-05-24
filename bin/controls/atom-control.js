(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var AtomControl = /** @class */ (function () {
        function AtomControl() {
        }
        AtomControl.prototype.setLocalValue = function (arg0, arg1, arg2, arg3) {
            throw new Error("Method not implemented.");
        };
        return AtomControl;
    }());
    exports.AtomControl = AtomControl;
});
//# sourceMappingURL=atom-control.js.map