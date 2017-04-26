/**
 * Created by McSim on 24.09.2016.
 */


module.exports = {
    database: {
      url: 'mongodb://localhost:27017/masterwork'
    },
    storage: {  
        initialTagWeight: 1,
        tagMultiplier: 2,
        tagFadeFactor: 0.05
    },
    port: 8000,
    host: 'localhost'
};