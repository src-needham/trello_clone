class List < ApplicationRecord
  acts_as_list

  has_many :cards, -> { order(position: :asc) }, dependent: :destroy

  scope :sorted, ->{ order(postition: :asc) }
  
  validates :name, presence: true
end
