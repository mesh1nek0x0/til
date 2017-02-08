#!/bin/ruby
10.times do |i|
  if i == 3 then
    next 
  elsif i == 7 then
    break
  end
  p i
end

10.times {|i| p i if i == 3}
