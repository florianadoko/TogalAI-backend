import {
    Table,
    Column,
    Model,
    DataType,
    BeforeSave,
    HasMany
  } from "sequelize-typescript";
  import bcrypt from "bcryptjs";
  import Folder from "./Folder";
import { UserCreationAttributes } from "../interfaces/UserCreationAttributes";
  
  @Table({ timestamps: true, tableName: "users" })
  class User extends Model<User, UserCreationAttributes> {
    @Column({
      type: DataType.STRING,
      allowNull: false,
      unique: true,
    })
    email!: string;
  
    @Column({
      type: DataType.STRING,
      allowNull: false,
    })
    password!: string;
  
    @Column({
      type: DataType.STRING,
      allowNull: false,
      defaultValue: "user",
    })
    role!: string;
  
    @BeforeSave
    static async hashPassword(user: User) {
      if (user.changed("password")) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      }
    }
  
    @HasMany(() => Folder, {
      foreignKey: "userId",
      onDelete: "CASCADE",
    })
    folders!: Folder[];
  }
  
  export default User;
  