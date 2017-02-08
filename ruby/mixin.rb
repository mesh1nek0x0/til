#!/bin/ruby

module Debug
  def info
    puts %(#{self.class} debug info...)
  end
end

class Player
  include Debug
end

class Enemy
  include Debug
end

tarou = Player.new
oni = Enemy.new

tarou.info
oni.info
