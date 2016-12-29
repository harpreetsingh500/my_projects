module Pawn
  attr_reader :pos1, :pos2, :attack_choices
  
  def set_position(obj)
    @pos1 = obj.position[0]
    @pos2 = obj.position[1]
  end
  
  def pawn_info(obj)
    set_position(obj)
    return 0 if cant_move(obj)
    pawns = (obj.color == 'cyan') ? CyanPiece::CYAN_PAWNS : RedPiece::RED_PAWNS
    if pawns.include?(cords[obj.position])
      puts "This is the Pawns first move."
      puts "It can move either 1 or 2 spaces forward."
      return 2
    end
    puts "This pawn can move 1 space forward."
    1
  end
  
  def move_pawn(amount, obj, player = 'human')
    num = amount if player == 'computer'
    if player == 'human'
      puts "How many spaces would you like to move: "
      num = 0
      loop do
        num = gets.chomp.to_i
        break if num <= amount && num > 0
        puts "Invalid input."
      end
    end
    board[pos1][pos2] = ' '
    obj.color == 'cyan' ? @pos1 -= num : @pos1 += num    
    board[pos1][pos2] = obj
    obj.position = [pos1, pos2]
  end
  
  def cant_move(obj)
    obj.color == 'cyan' ? @pos1 -= 1 : @pos1 += 1
    if board[pos1][pos2] != ' '
      true
    else
      obj.color == 'cyan' ? @pos1 += 1 : @pos1 -= 1
      false
    end
  end
end
