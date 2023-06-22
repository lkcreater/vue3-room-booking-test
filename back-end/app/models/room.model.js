module.exports = (sequelize, Sequelize) => {
    const Model = sequelize.define("room", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        startDate: {
            type: Sequelize.TIME,
            allowNull: false
        },
        endDate: {
            type: Sequelize.TIME,
            allowNull: false
        },
        published: {
            type: Sequelize.BOOLEAN,
            defaultValue: true
        },
    },
    { 
        timestamps: false,
    });

  
    return Model;
};
  