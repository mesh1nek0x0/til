#!/bin/ruby

class User
  attr_reader :id 
  attr_reader :name
  def initialize(name = 'nanashi')
    @id = Time.now.to_i
    @name = name
  end
  def showInfo()
    puts %(#{name}'s id:#{self.id})
  end
end

tarou = User.new('tarou')
tarou.showInfo

class AdminUser < User
  attr_accessor :id
  def changeId
    sleep 1
    @id = Time.now.to_i
  end
end

superTarou = AdminUser.new('superTarou')
superTarou.showInfo
superTarou.changeId
superTarou.showInfo

