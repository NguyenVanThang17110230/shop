'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        let data = [
            { name: '3.5 UK', summary: 'Men item' },
            { name: '4 UK', summary: 'Men item' },
            { name: '5 UK', summary: 'Men item' },
        ];
        data.map(item => {
            item.createdAt = Sequelize.literal('NOW()');
            item.updatedAt = Sequelize.literal('NOW()');
            return item;
        });
        return queryInterface.bulkInsert('Sizes', data, {});
    },

    down: (queryInterface, Sequelize) => {

        return queryInterface.bulkDelete('Sizes', null, {});

    }
};