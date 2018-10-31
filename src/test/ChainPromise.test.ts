import {ChainPromise} from "../ChainPromise";

console.log("start construct ChainPromise");
let deferred: any = {};
let promise = new Promise((resolve, reject) => {
    deferred.resolve = resolve;
    deferred.reject = reject;
});
let cp = ChainPromise.from(promise)
    .map(x => {
        console.log(x, "+1");
        return x + 1;
    })
    .map(x => {
        console.log(x, "+2");
        return Promise.resolve(x + 2);
    })
    .flatMap(x => {
        console.log(x, "*", x);
        return x * x;
    })
    .map(x => {
        console.log(x, "-5");
        return x - 5;
    });
console.log("end construct ChainPromise");
cp.subscribe(console.log, console.error);
deferred.resolve(4);
console.log("deffered is resolved.");
console.log("program end");