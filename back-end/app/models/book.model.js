module.exports = (sequelize, Sequelize) => {
    const Model = sequelize.define("book", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        roomId: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        memberName: {
            type: Sequelize.STRING,
            allowNull: false
        },
        dateJob: {
            type: Sequelize.DATE,
            allowNull: false
        },
        startTimeJob: {
            type: Sequelize.TIME,
            allowNull: false
        },
        endTimeJob: {
            type: Sequelize.TIME,
            allowNull: false
        },
        active: {
            type: Sequelize.BOOLEAN,
            defaultValue: true
        },
    },
    { 
        timestamps: false,
    });

    Model.vertifyDatetime = async (dateJob, timeBegin) => {
        try {            
            const records = await sequelize.query(`SELECT * FROM books WHERE dateJob='${dateJob}' AND TIME(TIMEDIFF('${timeBegin}', startTimeJob)) < '01:00:00'`, {
                type: Sequelize.QueryTypes.SELECT,
            });
            return records;
        } catch (error) {
            throw error;
        }        
    }

    Model.listOnJob = async (roomId) => {
        try {            
            const records = await sequelize.query(`SELECT * FROM books WHERE roomId=${roomId} AND dateJob>=curdate() order by dateJob asc, startTimeJob asc`, {
                type: Sequelize.QueryTypes.SELECT,
            });
            return records;
        } catch (error) {
            throw error;
        }
    }
  
    return Model;
};