# 普通のchaiとchai-as-promised

通常のchai
-> resolveで返ってきたもののassertに失敗しても、expectedとactualがでない

chai-as-promised
-> resolve/rejectで返ってきたものどちらのassertも
　　失敗したら、expectedとactualがでる。ただし、全て赤文字。
　　通常のchaiのようにexpectedが緑でactualが赤みたいな感じにならない

結論的には
doneで同期的に書くのではなくpromised-chaiでreturnして書く形がよさそう。
```
it('', (done) => {
  Promise.resolve().then(() => {
    // some assertion
    done();
  }).catch((e) => {
    done(e);
  })
});
```
↓
```
it('', ()=> {
  return Promise.resolve().then(() => {
    // some assertion
  })
});
it('', ()=> {return Promise.reject()});
```
