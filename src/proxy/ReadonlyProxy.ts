const mapProxy: ProxyHandler<Map<any, any>> = {
    get(target, prop: string | symbol, receiver) {
        if (prop === 'get') {
            return (key: any) => {
                const value = Reflect.get(target, prop, receiver).call(target, key);
                return typeof value === 'object' && value !== null ? asReadonly(value) : value;
            };
        }
        if (prop === 'set' || prop === 'delete' || prop === 'clear') {
            return () => {
                throw new Error("Cannot modify readonly map");
            };
        }
        if (typeof target[prop as keyof Map<any, any>] === 'function') {
            return Reflect.get(target, prop, receiver);
        }
        const value = Reflect.get(target, prop, receiver);
        return typeof value === 'object' && value !== null ? asReadonly(value) : value;
    },
    set() {
        throw new Error("Cannot modify readonly map");
    },
    deleteProperty() {
        throw new Error("Cannot delete property from readonly map");
    },
    defineProperty() {
        throw new Error("Cannot define property on readonly map");
    },
    setPrototypeOf() {
        throw new Error("Cannot set prototype of readonly map");
    }
};

const proxy: ProxyHandler<any> = {
    get(target: any, prop: string) {
        const value = Reflect.get(target, prop);

        return asReadonly(value);
    },
    set() {
        throw new Error("Cannot modify readonly object");
    },
    deleteProperty() {
        throw new Error("Cannot delete property from readonly object");
    },
    defineProperty() {
        throw new Error("Cannot define property on readonly object");
    },
    setPrototypeOf() {
        throw new Error("Cannot set prototype of readonly object");
    }
}

export function asReadonly<T>(target: T): T {
    if (typeof target === "object" && target !== null) {
        if (target instanceof Element) return target;
        if (target instanceof Map) return new Proxy(target, mapProxy) as T
        
        return new Proxy(target, proxy)
    }

    return target;
}
