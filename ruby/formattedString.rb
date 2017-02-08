#!/bin/ruby

p "name: %s" % "mesh1neko"
p "name: %10s" % "mesh1neko"
p "name: %-10s" % "mesh1neko"

p "id: %05d, rate: %10.2f" % [355, 3.28]

printf("name: %s\n", "mesh1neko")
p sprintf("id: %05d, rate: %10.2f", 355, 3.14)
