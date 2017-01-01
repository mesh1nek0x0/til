#!/bin/ruby
class Character
  VERSION = 1.1
  @@count = 0
  attr_reader :name
  
  def initialize(name = 'nanashi')
    @@count += 1
    @name = name
  end

  def sayHi
    puts %(hi #{self.name})
  end

  def self.info
    %(there are #{@@count}'s instances. @ version #{VERSION})
  end
end

yuma = Character.new('yuma')
chika = Character.new('chika')
osamu = Character.new('osamu')

puts Character::VERSION
yuma.sayHi
chika.sayHi
osamu.sayHi

puts Character.info
