#!/bin/ruby
score = 100
p score.class
name = 'mesh1neko'

puts name + ' is ' + score.to_s

# intの変数に文字列入れるのはOKなんすね
score = '100'
p score.class
subScore = 50

puts score.to_i + subScore

array = {hoge: 100, foo: 200}
p array
p array.to_a
array = [[1,1], [2, 2]]
### ruby2.0ではto_hはまだ実装されていない...
#p array.to_h
