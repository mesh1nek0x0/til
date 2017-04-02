# promise-test-helper
本来rejectされることを期待されているところがresolveした場合、

意図せずテストが通ってしまうことがある。

これはrejectするためcatch文でassertしているため、

意図しない方が返ってくるとうまくassertされないようです。

shouldFulfilledやshouldResolvedを挟むことで、意図しないtest passを防げる模様。

なるほどねー！
