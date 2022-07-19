const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "dog",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },

      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      height_min: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      height_max: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      weight_min: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      weight_max: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      years_life: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      image: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      timestamps: false,
    }
  );
};
