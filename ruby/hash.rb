#!/bin/ruby

scores = {'tarou' => 100, 'jirou' => 200}
p scores
members = {:id001 => 'tarou', :id002 => 'jirou'}
p members
products = {id001: 200, id002: 400}
p products

p products.size
p products.keys
p products.values
p products.key?('id003')

