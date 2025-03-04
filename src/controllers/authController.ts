import { Request, Response } from "express";
import UserService from "../services/userService";


class AuthController {
  //register 
  static async register(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const user = await UserService.register(email, password);
      res.status(201).json({ message: "User registered", user });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

 //login   
  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const token = await UserService.login(email, password);
      res.json({ message: "Login successful", token });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}

export default AuthController;
