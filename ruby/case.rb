#/bin/ruby
signal = gets.chomp

p %(input signal is %s) % signal

case signal
  when 'red'
    puts 'stop'
  when 'green', 'blue'
    puts 'go'
  when 'yellow'
    puts 'caution'
  else
    puts 'wrong signal'
end
