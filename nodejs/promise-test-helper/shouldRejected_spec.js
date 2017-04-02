const assert = require('assert');
const promiseTestHelper = require('promise-test-helper');


var shouldRejected = promiseTestHelper.shouldRejected;

function mayBeRejected(){
    return Promise.resolve();
}
it("is bad pattern", function () {
    return mayBeRejected().catch(function (error) {
        assert(error instanceof Error);
    });
});

it("is shouldRejected pattern", function () {
    return shouldRejected(mayBeRejected()).catch(function (error) {
        assert(error instanceof Error);
    });
});
