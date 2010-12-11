class CreateAlerts < ActiveRecord::Migration
  def self.up
    create_table :alerts do |t|
      t.text :news
      t.string :link
      t.integer :member_id

      t.timestamps
    end
  end

  def self.down
    drop_table :alerts
  end
end
