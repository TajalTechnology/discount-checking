module.exports = {
    userData: (user) => {
        return {
            id: user.dataValues.id,
            userName: user.dataValues.userName,
            email: user.dataValues.email,
            status: user.dataValues.status,
            softDelete: user.dataValues.softDelete,
            createdAt: user.dataValues.createdAt,
            updatedAt: user.dataValues.updatedAt,
        }
    }
}