class TaskEntity {
    _id;
    title;
    clientName;
    clientPhone;
    clientEmail;
    userID;
    createDate;
    timeStamp;
}
class UserEntity {
    _id;
    privateName;
    familyName;
    birthDate;
    userName;
    password;
    admin;
}

module.exports = {TaskEntity, UserEntity};
