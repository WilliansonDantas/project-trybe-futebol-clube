const validadedPassword = (req, res, next) => {
    const { password } = req.body;

    if (password === undefined) {
        return res.status(400).json({ message: 'O campo "password" é obrigatório' });
    }
    next();
};

module.exports = validadedPassword;