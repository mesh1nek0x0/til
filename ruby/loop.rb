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

for i in 15..20 do
  p i
end

for color in %W(blue red green) do
  p color
end

%W(1 2 3).each {|i| puts i}

{tarou:100, jirou:200}.each do |name, score|
  puts "#{name}: #{score}"
end
