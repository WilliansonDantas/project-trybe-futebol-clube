import * as express from 'express';
// código will
import 'express-async-errors';
import { NextFunction, Request, Response } from 'express';
import ErrorHandler from './middlewares/ErrorHandler';
import loginRouter from './routers/loginRouter';
import HttpException from './utils/HttpException';
import loginValidateRouter from './routers/loginValidateRouter';

// código will

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();
    // código will

    this.router();
    this.app.use((error: HttpException, req: Request, res: Response, next: NextFunction) =>
      ErrorHandler.handle(error, req, res, next));
    // código will

    // Não remover essa rota
    this.app.get('/', (req, res) => res.json({ ok: true }));
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
  }

  // código will

  private router(): void {
    this.app.use(loginRouter);
    this.app.use(loginValidateRouter);
  }

  // código will

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
