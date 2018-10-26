export class Observable {
    static of = v => new Observable(() => v);

    constructor(public f: Function) {
    }

    map(g): Observable {
        return new Observable(x => g(this.f(x)));
    }

    flatMap(g): Observable {
        return new Observable(x => this.f(x).run()).map(g);
    }

    run(x?) {
        return this.f(x);
    }

    subscribe(onSuccess?: Function): void {
        onSuccess(this.f());
    }
}