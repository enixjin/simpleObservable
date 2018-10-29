export class Observable {
    static of = v => new Observable(() => Promise.resolve(v));
    static fromPromise = (v: () => Promise<any>) => new Observable(v);

    constructor(public f: (...args) => Promise<any>) {
    }

    map(g): Observable {
        return new Observable(x => Promise.resolve(this.f(x).then(g)));
    }

    flatMap(g): Observable {
        return new Observable(x => Promise.resolve(this.f(x))).map(g);
    }

    run(x?) {
        return this.f(x);
    }

    subscribe(onSuccess?: Function): void {
        Promise.resolve(this.f()).then(x => onSuccess(x));
    }
}