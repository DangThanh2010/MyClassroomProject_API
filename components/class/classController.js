const nodemailer = require('nodemailer');

const service = require('./classService');

module.exports.listClass = async (req, res, next) => {
    console.log(req.user);
    const listClass = await service.listClass(req.user);
    res.json(listClass.Classes);
}

module.exports.getClass = async (req, res, next) => {
    const result = await service.getClass(parseInt(req.params.id));
    const role = await service.getRoleClass(parseInt(req.params.id),req.user.id);
    res.json(result);
}
module.exports.getRoleClass = async (req, res, next) => {
    const role = await service.getRoleClass(parseInt(req.params.id),req.user.id);
    res.json(role);
}
module.exports.addClass = async (req, res, next) => {
    if(req.body.name !== "" && req.body.name !== null && req.body.name !== undefined)
    {
        await service.addClass(req.body.name, req.body.subject);
        res.json('Create successful');
    }
    else
        res.json('Create unsuccessful');
}

module.exports.deleteClass = async (req, res, next) => {
    await service.removeClass(req.user.id,parseInt(req.params.id));
    res.json('Delete successful');
}

module.exports.sendEmailInvite = async (req, res, next) => {
    const cls = await service.getClass(parseInt(req.params.id));

    if(cls && req.body.email && req.query.role)
    {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });
        
        const mailOptions = {
            from: process.env.EMAIL_USER, 
            to: req.body.email, 
            subject: req.query.role === "Teacher" ? "Lời mời cùng dạy lớp: " + cls.name : "Lời mời tham gia lớp: " + cls.name,
            text: req.query.role === "Teacher" ?  "Bạn có một lời mời cùng dạy lớp " + cls.name + "\nLink tham gia: " + cls.inviteLinkTeacher
                    : "Bạn có một lời mời tham gia lớp " + cls.name + "\nLink tham gia: " + cls.inviteLinkStudent,
        };
        
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
                res.json({"result": 0});
            } else {
                console.log('Email sent: ' + info.response);
                res.json({"result": 1});
            }
        });
    }
    else{
        res.json({"result": 0});
    }
}