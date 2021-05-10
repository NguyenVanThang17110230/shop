'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        let data = [
            { productId: 1, sizeId: 1, productCount: 3  },
            { productId: 1, sizeId: 2, productCount: 2  },
            { productId: 1, sizeId: 3, productCount: 5  },
            { productId: 2, sizeId: 1, productCount: 5  },
            { productId: 2, sizeId: 2, productCount: 4  },
            { productId: 3, sizeId: 3, productCount: 10  },
            
        ];
        data.map(item => {
            item.createdAt = Sequelize.literal('NOW()');
            item.updatedAt = Sequelize.literal('NOW()');
            return item;
        });
        return queryInterface.bulkInsert('ProductSizes', data, {});
    },

    down: (queryInterface, Sequelize) => {

        return queryInterface.bulkDelete('ProductSizes', null, {});

    }
};