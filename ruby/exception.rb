#!/bin/ruby

class MyException < StandardError; end

x = gets.chomp.to_i
begin
  raise MyException if x == 3
  puts %(ansewer is ...:#{10 / x})
rescue => ex
  puts %(#{ex.class} has occured...)
  puts %(don't division by #{x}!!!)
ensure
  puts %(culcurate end.)
end
