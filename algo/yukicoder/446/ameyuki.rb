#!/bin/ruby
A=gets.strip
B=gets.strip

if md = A.match(/(^[1-9]{1}[0-9]{1,4}$|^[0]{1}$)/)
  numericA = md[0]
else
  puts 'NG'
  exit
end

if md = B.match(/(^[1-9]{1}[0-9]{1,4}$|^[0]{1}$)/)
  numericB = md[0]
else
  puts 'NG'
  exit
end

if numericA.to_i <= 12345 && numericB.to_i <= 12345
  puts 'OK'
else
  puts 'NG'
end
