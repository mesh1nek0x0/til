#!/bin/ruby

class User
  attr_accessor :name
  def initialize(name = 'nanashi')
    self.name = name
  end

  def say_public_hi
    puts %(hi! #{self.name}! I'm from public!)
    _say_private_hi
  end

  private
  def _say_private_hi
    puts %(hi! #{self.name}! I'm from private!)
  end
end

tarou = User.new
tarou.say_public_hi
#tarou._say_private_hi

class AdminUser < User
  private
  def _say_private_hi
    puts %(Hi! #{self.name}!!!!! I'm from Admin private)
  end
end

superTarou = AdminUser.new
superTarou.say_public_hi
