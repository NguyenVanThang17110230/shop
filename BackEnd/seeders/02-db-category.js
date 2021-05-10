'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        let data = [
            { name: 'Nam', imagePath: '/img/cate/nam.png', summary: 'Men item'  },
            { name: 'Nữ', imagePath: '/img/cate/nu.png', summary: 'Women item' },
            { name: 'Thể Thao', imagePath: '/img/cate/the-thao.png', summary: 'Sporty item' },
            { name: 'Trẻ Em', imagePath: '/img/cate/tre-em.png', summary: 'Kids item' },
            { name: 'Du lịch', imagePath: '/img/cate/du-lich.png', summary: 'Traves item' }
        ];
        data.map(item => {
            item.createdAt = Sequelize.literal('NOW()');
            item.updatedAt = Sequelize.literal('NOW()');
            return item;
        });
        return queryInterface.bulkInsert('Categories', data, {});
    },

    down: (queryInterface, Sequelize) => {

        return queryInterface.bulkDelete('Categories', null, {});

    }
};