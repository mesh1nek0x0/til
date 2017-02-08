#!/bin/ruby

class User
  attr_accessor :name, :nickname
  attr_reader :id

  @name
  @id
  @nickname

  def initialize(name = 'nanashi')
    self.name = name
    sleep 1
    @id = Time.now.to_i
    puts %(#{self.name}'s id : #{self.id})
  end

  def sayHi
    p %(hi! #{@name})
  end

  def nickname=(nickname)
    @nickname = nickname
  end
end

tom = User.new("tom")
mesh1neko = User.new("mesh1neko")
nanashi = User.new

tom.sayHi
mesh1neko.sayHi
nanashi.sayHi

mesh1neko.nickname = 'mesh1'
puts "nickname:#{mesh1neko.nickname}"

puts tom.id
puts tom.name = "Tom"
tom.sayHi
tom.id = 123 # Error
