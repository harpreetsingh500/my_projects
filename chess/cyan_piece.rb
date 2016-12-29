class CyanPiece
  attr_accessor :name, :position
  CYAN_PAWNS = ['a2', 'b2', 'c2', 'd2', 'e2', 'f2', 'g2', 'h2']
  
  def initialize(piece)
    @name = piece
  end
  
  def color
    'cyan'
  end
  
  def on_black
    name.cyan_on_black
  end
  
  def on_white
    name.cyan_on_white
  end
  
  def full_name
    Game::PIECES[name]
  end
end
