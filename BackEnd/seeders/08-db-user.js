'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        let data = [
            { 
                userCode: 'ABC',
                fullName:'Long', 
                email:'buulong1999@gmail.com',  
                phone: '01213139913', 
                address: '171 Phú Nhuận',
                avatarPath: '/img/user/long.png',
                isAdmin: true,
            },
            { 
                userCode: 'BCD',
                fullName:'Nguyên', 
                email:'nguyen123@gmail.com',  
                phone: '01213139913', 
                address: '222 Phú Nhuận',
                avatarPath: '/img/user/nguyen.png',
                isAdmin: true,
            },
            { 
                userCode: 'DEF',
                fullName:'Khôi', 
                email:'buulong1999@gmail.com',  
                phone: '01213139913', 
                address: '333 Phú Nhuận',
                avatarPath: '/img/user/khoi.png',
                isAdmin: false,
            },
        ];
        data.map(item => {
            item.createdAt = Sequelize.literal('NOW()');
            item.updatedAt = Sequelize.literal('NOW()');
            return item;
        });
        return queryInterface.bulkInsert('Users', data, {});
    },

    down: (queryInterface, Sequelize) => {

        return queryInterface.bulkDelete('Users', null, {});

    }
};