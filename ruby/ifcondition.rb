#!/bin/ruby
score = gets.to_i

if score > 80 then
  puts 'so good!'
elsif score > 60
  puts 'good'
else
  puts 'soso'
end

puts 'score > 80 codition written in postposition' if score > 80
