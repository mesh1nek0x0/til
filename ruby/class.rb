#!/bin/ruby

class User
  @name
  def initialize(name = 'nanashi')
    @name = name
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
