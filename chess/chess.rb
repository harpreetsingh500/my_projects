require 'colored'
require 'pry'
require_relative 'red_piece'
require_relative 'cyan_piece'
require_relative 'players'
require_relative 'pieces'

class Board
  attr_reader :board, :cords, :current_cords, :current_cords_computer
  
  def initialize
    @board = Array.new(8) {Array.new(8, ' ')}
    set_pieces_on_board
  end
  
  def display
    color = 'black'
    8.times do |idx|
      row = ""
      8.times do |idx2|
        color = (color == 'white') ? 'black' : 'white'
        square = (color == 'white') ? set_color_at(idx, idx2, 'white') : set_color_at(idx, idx2, 'black')
        set_index(idx, idx2)
        row += "|#{square}"
      end
      color = (color == 'white') ? 'black' : 'white'
      puts (8 - idx).to_s + row + "|"
    end
    puts '  a b c d e f g h'
  end
  
  def set_index(idx, idx2)
    board[idx][idx2].position = [idx, idx2] if board[idx][idx2] != ' '
  end
  
  def give_name_to_coordinates
    @cords = {}
    counter = 8
    8.times do |x|
      8.times do |y|
        char = 'a'
        y.times { char = char.next }
        cords[[x,y]] = char + counter.to_s
      end
      counter -= 1
    end
  end
  
  def set_pieces_on_board
    give_name_to_coordinates
    board[0] = ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R'].map { |piece| RedPiece.new(piece) }
    board[1] = ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'].map { |piece| RedPiece.new(piece) }
    board[6] = ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'].map { |piece| CyanPiece.new(piece) }
    board[7] = ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R'].map { |piece| CyanPiece.new(piece) }
  end
  
  def show_pieces_to_player(color)
    @current_cords = []
    new_board = board.map { |row| row.map { |piece| piece if (piece != ' ' && piece.color == color) } }
    new_board.flatten!.compact!
    new_board.each do |piece|
      @current_cords << cords[piece.position]
      p "#{piece.full_name} : #{cords[piece.position]}"
    end
  end
  
  def get_computers_pieces(color)
    @current_cords_computer = []
    new_board = board.map { |row| row.map { |piece| piece if (piece != ' ' && piece.color == color) } }
    new_board.flatten!.compact!
    new_board.each { |piece| @current_cords_computer << cords[piece.position] }    
  end
  
  def set_color_at(idx, idx2, color)
    piece = board[idx][idx2]
    return color == 'white' ? piece.on_white : piece.on_black if piece == ' '  
    color == 'white' ? piece.on_white : piece.on_black
  end
end

class Game < Board
  include Pawn
  attr_reader :player, :computer
  PIECES = {'P' => 'Pawn', 'B' => 'Bishop', 'N' => 'Knight', 
            'R' => 'Rook', 'Q' => 'Queen', 'K' => 'King'}
  
  def set_name
    name = ''
    puts "Hello please enter your name: "    
    loop do
      name = gets.chomp
      break unless name == ' ' || name.empty?
      puts "Please enter a valid name."
    end
    @player = Human.new(name)
    @computer = Computer.new("R2D2")    
  end
  
  def pick_color
    puts "#{player.name} pick the red pieces or cyan pieces: "
    piece = ''
    loop do
      piece = gets.chomp
      break if ['red', 'cyan'].include?(piece.downcase)
      puts "Please enter a valid color."
    end
    player.color = piece
    computer.color = (piece == 'red' ? 'cyan' : 'red')  
  end
  
  def start
    welcome_message
    set_name
    pick_color
    puts "#{player.name} has picked the #{player.color} pieces."
    puts "#{computer.name} was assigned the #{computer.color} pieces."
    puts ""
    sleep(1)
    system 'clear'
    5.times do
      display
      player_moves_piece
      computer_moves_piece
      system 'clear'
    end
    display
  end
  
  def welcome_message
    puts "Hello welcome to the chess program."
  end
  
  def computer_moves_piece
    pawns = []
    get_computers_pieces(computer.color)
    current_cords_computer.each do |position|
      pos = cords.key(position)
      pawns << board[pos[0]][pos[1]] if board[pos[0]][pos[1]].full_name == 'Pawn'
    end
    piece = pawns.sample
    amount = [1,2].sample
    set_position(piece)
    move_pawn(amount, piece, 'computer')
  end
  
  def player_moves_piece
    puts ""
    puts "Your pieces and their locations."
    show_pieces_to_player(player.color)
    puts "Pick a piece by typing it's location (example: a8)."
    position = ''
    loop do
      position = gets.chomp
      break if current_cords.include?(position)
      puts "Please enter a valid choice."
    end
    show_piece_name(position)
  end
  
  def show_piece_name(position)
    pos = cords.key(position)
    obj = board[pos[0]][pos[1]]
    puts "You have chosen to move #{obj.full_name}."
    move_piece(obj)
  end
  
  def move_piece(obj)
    if obj.full_name == 'Pawn'
      amount = pawn_info(obj)
      if amount == 0
        puts "Sorry this piece can't move forward."
        puts "Their is another piece in that place."
        puts "Please pick again."
        player_moves_piece
      else
        move_pawn(amount, obj)
      end
    end
  end
end

Game.new.start















