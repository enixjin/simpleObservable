export class ChainPromise {
    static from = (v: Promise<any>) => new ChainPromise(() => v);

    constructor(public f: (...args) => Promise<any>) {
    }

    map(g): ChainPromise {
        return new ChainPromise(x => Promise.resolve(this.f(x)).then(v => g(v)));
    }

    flatMap(g): ChainPromise {
        return new ChainPromise(x => Promise.resolve(this.f(x))).map(g);
    }

    subscribe(onSuccess?: Function, onFail?: Function): void {
        Promise.resolve(this.f()).then(x => onSuccess(x)).catch(e => onFail(e));
    }
}