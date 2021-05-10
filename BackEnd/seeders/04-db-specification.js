'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        let data = [
            { name: 'Chiều cao', summary: 'Men item' },
            { name: 'Trọng lượng', summary: 'Men item' },
            { name: 'Chất liệu', summary: 'Men item' },
        ];
        data.map(item => {
            item.createdAt = Sequelize.literal('NOW()');
            item.updatedAt = Sequelize.literal('NOW()');
            return item;
        });
        return queryInterface.bulkInsert('Specifications', data, {});
    },

    down: (queryInterface, Sequelize) => {

        return queryInterface.bulkDelete('Specifications', null, {});

    }
};