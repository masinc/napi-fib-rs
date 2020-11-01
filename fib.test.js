const TestScheduler = require('jest');
const fib = require('./index');

const fibonacciArray = [ -1,
    1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597, 2584, 4181, 6765, 10946, 17711, 28657, 46368, 75025, 121393, 196418, 317811, 514229, 832040, 1346269, 2178309, 3524578, 5702887, 9227465, 14930352, 24157817, 39088169, 63245986, 102334155, 165580141, 267914296, 433494437, 701408733, 1134903170, 1836311903, 2971215073, 4807526976, 7778742049, 12586269025, 20365011074,
];


function jsFibonacci(n) {
    if (n === 1 || n === 2) {
        return 1;
    }

    return jsFibonacci(n -1) + jsFibonacci (n - 2);
}


function* rangeWithEnd(begin, end, interval = 1) {
    for (let i = begin; i <= end; i += interval) {
        yield i;
    }
}

Array.from(rangeWithEnd(30, 42)).forEach(n => {
    test(`fibonacci(${n}) for rust`, () => {
        expect(fib.fibonacci(n)).toBe(fibonacciArray[n]);
    });

    test(`fibonacci(${n}) for js`, () => {
        expect(jsFibonacci(n)).toBe(fibonacciArray[n]);
    });
});
