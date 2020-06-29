const db = require('./dbConfig');
const Sequelize = require('sequelize');

//YOUR CODE GOES HERE

const Pumpkin = db.define('pumpkin', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    size: {
        type: Sequelize.ENUM,
        values: ['small', 'medium', 'large']
    },
    evil:{
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    carved:{
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    candle:{
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
})

//hook
Pumpkin.beforeCreate((pumpkin) => {
    if(Math.floor(Math.random()*10%2>0)){
        pumpkin.evil = true;
        pumpkin.name = 'EVIL' + pumpkin.name;
    } else {
        pumpkin.name = 'GOOD' + pumpkin.name;
    }
})

Pumpkin.prototype.lightcandle = function(){
    return new Promise((res, rej) => {
        if(this.carved){
            this.update({candle: true});
            res(true);
        } else {
            rej(false);
        }
    })
}

//--------------------
module.exports = Pumpkin;
