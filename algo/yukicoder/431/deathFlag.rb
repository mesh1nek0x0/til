#!/bin/ruby

status = gets.split.map(&:to_i)
if status.pop == 1 then
  flag = false
elsif status.inject(:+) >= 2 then
  flag = true
end
puts flag ? 'DEAD' : 'SURVIVED'
