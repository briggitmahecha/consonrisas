class AddRoleIdToAlert < ActiveRecord::Migration
  def self.up
    add_column :alerts, :role_id, :integer
  end

  def self.down
    remove_column :alerts, :role_id
  end
end
