#!/bin/ruby
name = gets.chomp

def sayHi(name = "ruby")
  "hi! #{name}"
end

def sayHello(name)
  return %(hello! #{name})
end

p sayHi
p sayHi name
p sayHi(name)

p sayHello name
p sayHello
