//referecia o inscrustacion

"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Post_Tags extends Model {
    static associate(models) {
      // Aquí no es estrictamente necesario definir asociaciones tradicionales,
      // ya que la unión fuerte se declara en Post y en Tag.
    }
  }
  Post_Tags.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      postId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Posts", // Nombre de la tabla en la BD
          key: "id"
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      },
      tagId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Tags", // Nombre de la tabla en la BD
          key: "id"
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      }
    },
    {
      sequelize,
      modelName: "Post_Tags",
      tableName: "Post_Tags", // Forzamos el nombre de la tabla
    }
  );
  return Post_Tags;
};