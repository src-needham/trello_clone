class CreateCards < ActiveRecord::Migration[6.1]
  def change
    create_table :cards do |t|
      t.reference :list
      t.string :name
      t.integer :postition

      t.timestamps
    end
  end
end
