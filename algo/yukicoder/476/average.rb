#!/bin/ruby
n,a=gets.split.map(&:to_i)
list = gets.split.map(&:to_i)

sum = 0
for i in list do
  sum += i
end

if sum.to_f / list.size === a
  puts %(YES)
else
  puts %(NO)
end