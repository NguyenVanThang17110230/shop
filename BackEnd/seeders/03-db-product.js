'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        let data = [
            { 
                name: 'Adidas 3000',
                productCode:'A', 
                price:50.5,  
                imagePath: '/img/product/adidas3000.png', 
                availability: true,
                summary: 'Adidas',
                amount: 10,
                description: 'Coding',
                color: 'Red'
            },
            { 
                name: 'Balenciaga 3000',
                productCode:'A', 
                price:40.5,  
                imagePath: '/img/product/balenciaga3000.png', 
                availability: true,
                summary: 'Balenciaga',
                amount: 10,
                description: 'Coding',
                color: 'Red'
            },
            { 
                name: 'Adidas 2300',
                productCode:'A', 
                price:50.5,  
                imagePath: '/img/product/adidas2300.png', 
                availability: false,
                summary: 'Adidas',
                amount: 0,
                description: 'Coding',
                color: 'Red'
            },
            { 
                name: 'Balenciaga 2000',
                productCode:'A', 
                price:40.5,  
                imagePath: '/img/product/balenciaga2000.png', 
                availability: true,
                summary: 'Adidas',
                amount: 10,
                description: 'Coding',
                color: 'Blue'
            }
        ];
        data.map(item => {
            item.createdAt = Sequelize.literal('NOW()');
            item.updatedAt = Sequelize.literal('NOW()');
            return item;
        });
        return queryInterface.bulkInsert('Products', data, {});
    },

    down: (queryInterface, Sequelize) => {

        return queryInterface.bulkDelete('Products', null, {});

    }
};