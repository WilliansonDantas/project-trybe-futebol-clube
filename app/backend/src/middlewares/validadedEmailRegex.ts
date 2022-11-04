// const validadedEmail = (req, res, next) => {
//   const { email } = req.body;
//   if (email.match(/\S+@\S+\.\S+/) === null) {
//     return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
//   }
//   next();
// };

// module.exports = validadedEmail;

// // Referência 01:
// // Regex para email:
// // https://www.horadecodar.com.br/2020/09/13/como-validar-email-com-javascript
// // Referência 02:
// // Função match:
// // https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/String/match
