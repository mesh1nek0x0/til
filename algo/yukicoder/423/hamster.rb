#!/bin/ruby
n = gets.chomp
ham2bit2decimal = n.gsub(/hamu/, '1').gsub(/ham/, '0').to_i(2)
puts (ham2bit2decimal * 2).to_s(2).gsub(/1/, 'hamu').gsub(/0/, 'ham')
