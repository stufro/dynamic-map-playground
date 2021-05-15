class CreateIncidents < ActiveRecord::Migration[6.1]
  def change
    create_table :incidents do |t|
      t.string :reference
      t.float :lat
      t.float :lon
      t.string :status
      t.string :description
      t.string :priority

      t.timestamps
    end
  end
end
