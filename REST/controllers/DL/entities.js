class TaskEntity {
    id;
    title;
    userID;
    createDate;
    timeStamp;
}
class UserEntity {
    id;
    privateName;
    familyName;
    birthDate;
    userName;
    password;
    admin;
}

module.exports = {TaskEntity, UserEntity};
