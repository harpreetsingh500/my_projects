class RedPiece
  attr_accessor :name, :position
  RED_PAWNS = ['a7', 'b7', 'c7', 'd7', 'e7', 'f7', 'g7', 'h7']
  
  def initialize(piece)
    @name = piece
  end
  
  def color
    'red'
  end
  
  def on_black
    name.red_on_black  
  end
  
  def on_white
    name.red_on_white
  end
  
  def full_name
    Game::PIECES[name]
  end
end
