'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        let data = [
            { name: 'Adidas', imagePath: '/img/brand/adidas.png', summary: 'Adidas'  },
            { name: 'Balenciaga', imagePath: '/img/brand/balenciaga.png', summary: 'Balenciaga' }
        ];
        data.map(item => {
            item.createdAt = Sequelize.literal('NOW()');
            item.updatedAt = Sequelize.literal('NOW()');
            return item;
        });
        return queryInterface.bulkInsert('Brands', data, {});
    },

    down: (queryInterface, Sequelize) => {

        return queryInterface.bulkDelete('Brands', null, {});

    }
};