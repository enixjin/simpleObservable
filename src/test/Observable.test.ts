import {Observable} from "../Observable";

console.log("start construct observable");
let obs = Observable.of(3)
    .map(x => {
        console.log(x, "+1");
        return x + 1;
    })
    .map(x => {
        console.log(x, "+2");
        return Observable.of(x + 2);
    })
    .flatMap(x => {
        console.log(x, "*", x);
        return x * x;
    })
    .map(x => {
        console.log(x, "-5");
        return x - 5;
    });
console.log("end construct observable");
obs.subscribe(console.log);
console.log("program end");