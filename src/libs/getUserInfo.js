const getUserInfo = (user) => {
    return {
        name: user.name,
        email: user.email,
        id: user._id
    } 
}

module.exports = getUserInfo;