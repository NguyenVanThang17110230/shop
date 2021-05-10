'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        let data = [
            { productId: 1, specificationId: 1, description: '30cm'  },
            { productId: 1, specificationId: 2, description: '300gam'  },
            { productId: 1, specificationId: 3, description: 'Vải dệt công nghệ adidas Primeknit'  },
            { productId: 2, specificationId: 1, description: '30cm'  },
            { productId: 2, specificationId: 2, description: '350gam'  },
            { productId: 2, specificationId: 3, description: 'Da tổng hợp'}
            
        ];
        data.map(item => {
            item.createdAt = Sequelize.literal('NOW()');
            item.updatedAt = Sequelize.literal('NOW()');
            return item;
        });
        return queryInterface.bulkInsert('ProductSpecifications', data, {});
    },

    down: (queryInterface, Sequelize) => {

        return queryInterface.bulkDelete('ProductSpecifications', null, {});

    }
};