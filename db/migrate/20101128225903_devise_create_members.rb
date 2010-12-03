class DeviseCreateMembers < ActiveRecord::Migration
  def self.up
    drop_table :members
    create_table(:members) do |t|
#      t.string :email
#      t.references :role
      t.database_authenticatable :null => false
      t.recoverable
      t.rememberable
      t.trackable

      # t.confirmable
      # t.lockable :lock_strategy => :failed_attempts, :unlock_strategy => :both
      # t.token_authenticatable


      t.timestamps
    end

    add_index :members, :email,                :unique => true
    add_index :members, :reset_password_token, :unique => true
    # add_index :members, :confirmation_token,   :unique => true
    # add_index :members, :unlock_token,         :unique => true
  end

  def self.down
    drop_table :members
  end
end
