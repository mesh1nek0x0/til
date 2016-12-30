#!/bin/ruby
tv = gets.strip.split(" ")
if(tv[0].to_i % 3 === 0)
  if (tv[1].to_i % 4 == 0)
    puts 'YOKO'
    exit
  end
end
puts 'TATE'
