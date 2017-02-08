#!/bin/ruby

class User
  attr_accessor :name
  attr_reader :id

  @name
  @id

  def initialize(name = 'nanashi')
    self.name = name
    sleep 1
    @id = Time.now.to_i
    puts %(#{self.name}'s id : #{self.id})
  end

  def sayHi
    p %(hi! #{@name})
  end
end

tom = User.new("tom")
mesh1neko = User.new("mesh1neko")
nanashi = User.new

tom.sayHi
mesh1neko.sayHi
nanashi.sayHi


puts tom.id
puts tom.name = "Tom"
tom.sayHi
tom.id = 123 # Error
