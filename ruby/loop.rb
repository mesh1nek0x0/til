#!/bin/ruby

max = gets.to_i
i = 0
while i < max do
  puts 'hoge'
  i += 1
end

10.times do |i|
  puts %(%s: hello) % i
end

5.times { |i| puts %(%s: foo) % i }
