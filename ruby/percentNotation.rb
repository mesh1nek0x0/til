#!/bin/ruby
puts "hello\" ruby"
puts 'hello\' ruby'
puts %(hello' ruby)
puts %Q(hello" ruby)
puts %q(hello' ruby)

hoge = "foo"
puts %(hoge is "#{hoge}")

p ["red", "blue"]
p ['red', 'blue']

p %W(red blue)
p %w(red blue)
