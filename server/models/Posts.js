// code to write sql commands as js functions with sequalize
// this is called an ORM


module.exports = (sequalize, DataTypes) => {

    const Posts = sequalize.define("Posts", {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        postText: {
            type: DataTypes.STRING,
            allowNull: false
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
    });
    return Posts
}