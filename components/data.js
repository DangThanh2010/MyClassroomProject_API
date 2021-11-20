const Class = require('./class/classModel');
const User = require('./users/userModel');
const Userservice = require('./users/userService');
const Classservice = require('./class/classService');
const UserinClass = require('./user_in_class/user_in_classModel');
const randomString = require('random-string');
const bcrypt = require('bcrypt');
const sequelize = require('sequelize');

// Import Data: node data --import
// Import Data Table UserInClass: node data --userinclass
function importData(){
    Class.bulkCreate([{
        name: 'Lớp học chính quy Web Nâng Cao',
        subject: 'Web',
        inviteLinkStudent: randomString({length: 20}),
        inviteLinkTeacher: randomString({length: 20}),
    },
    {
        name: 'Lớp học chính quy Web',
        subject: 'Web',
        inviteLinkStudent: randomString({length: 20}),
        inviteLinkTeacher: randomString({length: 20}),
    },
    {
        name: 'Lớp học chính quy Mobile',
        subject: 'Mobile',
        inviteLinkStudent: randomString({length: 20}),
        inviteLinkTeacher: randomString({length: 20}),
    },
    ]);
    
    User.bulkCreate([{
        email: 'kiost@gmail.com',
        password: bcrypt.hashSync("123456",10),
        fullname: 'Kito Asashi',
    },
    {
        email: 'johnnathan14@gmail.com',
        password: bcrypt.hashSync("123456789",10),
        fullname: 'Jonathan Joe',
    },
    {
        email: 'elim159@gmail.com',
        password: bcrypt.hashSync("12345678",10),
        fullname: 'Elim Red',
    }]);
    
    
}

async function importUserInClass(){
    try{
        const classdata = await Class.create({
            name: 'Lớp học chính quy Mobile Nâng Cao',
            subject: 'Mobile',
            inviteLinkStudent: randomString({length: 20}),
            inviteLinkTeacher: randomString({length: 20}),
        });
        
        const userdata = await User.create({
            email: 'ilina159@gmail.com',
            password: bcrypt.hashSync("12345678",10),
            fullname: 'Elina Natch',
        }).then(userdata => {
            userdata.addClass(classdata,{through: { role: '2' }});
            console.log("DATA: ", userdata);
        }).catch(err => {console.log(err);});
        
    }
    catch(e){
        console.log(e);
    }
};

if(process.argv[2] === '--import'){
    importData();
}else if(process.argv[2] === '--userinclass'){
    importUserInClass();
}

