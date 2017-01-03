#!/bin/ruby

module Movie
  VERSION = 1.0
  def self.export
    puts %(exporting...)
  end

  def self.import
    puts %(importing...)
  end
end

Movie.export

Movie.import

p Movie::VERSION
