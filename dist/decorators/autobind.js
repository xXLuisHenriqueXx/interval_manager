"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Autobind = void 0;
const Autobind = (_, __, descriptor) => {
    const originalMethod = descriptor.value;
    const adjDescriptor = {
        configurable: true,
        get() {
            const boundFn = originalMethod.bind(this);
            return boundFn;
        },
    };
    return adjDescriptor;
};
exports.Autobind = Autobind;
//# sourceMappingURL=autobind.js.map