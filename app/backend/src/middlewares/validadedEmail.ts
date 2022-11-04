// import { Request, Response, NextFunction } from 'express';

// export default class ValidadedEmail {
//   private _email;

//   constructor(email: string) {
//     this._email = email;
//   }

//   email(req: Request, res: Response, next: NextFunction) {
//     const { email } = req.body;
//     if (email === undefined) {
//       return res.status(400).json({ message: 'O campo "email" é obrigatório' });
//     }
//     next();
//   }
// }

// // Referência 01:
// // Regex para email:
// // https://www.horadecodar.com.br/2020/09/13/como-validar-email-com-javascript
// // Referência 02:
// // Função match:
// // https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/String/match
