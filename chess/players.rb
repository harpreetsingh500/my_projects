class Human
  attr_accessor :name, :color, :piece
  
  def initialize(name)
    @name = name
  end
end

class Computer
  attr_accessor :name, :color
  
  def initialize(name)
    @name = name
  end
end
