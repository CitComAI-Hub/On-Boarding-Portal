import { Request, Response, Router } from "express";
import { oidcService } from '../service/openid.service';

const router = Router();

router.get('/login', (req: Request, res: Response) => oidcService.login(req, res))
router.get('/login/callback', (req: Request, res: Response) => oidcService.callback(req, res))
router.get('/logout', (req: Request, res: Response) => oidcService.logout(req, res))
router.post('/login/refresh', (req: Request, res: Response) => oidcService.refresh(req, res))

export default router;