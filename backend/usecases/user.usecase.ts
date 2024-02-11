import { Request, Response } from "express";
import IUserRegistrationBody from "../interfaces/userBody";
import { HttpStatus } from "../enums/HttpStatus.enum";
import UserRepository from "../repositories/user.repository";
import {
  IActivationToken,
  IActivationRequest,
} from "../interfaces/activationToken";
import jwt, { Secret } from "jsonwebtoken";
import dotenv from "dotenv";
import ejs from "ejs";
import path from "path";
import nodemailer, { Transporter } from "nodemailer";
import EmailOptions from "../interfaces/email";
import { IUser } from "../interfaces/user";
import ILoginRequest from "../interfaces/login";
import { sendToken } from "../utils/jwt";

dotenv.config();

class UserUsecase {
  private userRepository: UserRepository;
  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async createUser(req: Request, res: Response) {
    try {
      console.log("usecase");
      const { name, email, password } = req.body;
      console.log(req.body);
      const isEmailExist = await this.userRepository.checkExistUser(email);
      console.log(isEmailExist);
      if (isEmailExist.data) {
        return {
          status: HttpStatus.ServerError,
          data: {
            success: false,
            message: "Account Exist already",
          },
        };
      }

      const user: IUserRegistrationBody = {
        name,
        email,
        password,
      };
      console.log("user");
      const activationToken = this.createActivationToken(user);
      const activationCode = (await activationToken).activationCode;

      const data = { user: { name: user.name }, activationCode };
      console.log("data", data);

      const html = await ejs.renderFile(
        path.join(__dirname, "../mails/activationMail.ejs"),
        data
      );
      console.log("Email HTML content:", html);
      try {
        await this.sendMail({
          email: user.email,
          subject: "Activate your account",
          template: "activationMail.ejs",
          data,
        });

        res.status(201).json({
          success: true,
          message: `Please check your mail ${user.email} to activate your account`,
          activationToken: (await activationToken).token,
        });
      } catch (error) {
        res.status(500).send({
          success: false,
          message: "server error",
        });
      }
    } catch (error) {
      res.status(500).send({
        success: false,
        message: "server error",
      });
    }
  }

  async createActivationToken(
    user: IUserRegistrationBody
  ): Promise<IActivationToken> {
    console.log("create activaton code");
    const activationCode = Math.floor(1000 + Math.random() * 9000).toString();
    // console.log(activationCode);
    // console.log(user);

    const token = jwt.sign(
      {
        user,
        activationCode,
      },
      process.env.ACTIVATION_SECRET as Secret,
      {
        expiresIn: "5m",
      }
    );
    // console.log(token);
    // console.log(token, activationCode);
    return { token, activationCode };
  }

  async sendMail(options: EmailOptions): Promise<void> {
    const transporter: Transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || "587"),
      service: process.env.SMTP_SERVICE,
      auth: {
        user: process.env.SMTP_MAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const { email, subject, template, data } = options;

    const templatePath = path.join(__dirname, "../mails", template);

    const html: string = await ejs.renderFile(templatePath, data);

    const mailOptions = {
      from: process.env.SMTP_MAIL,
      to: email,
      subject,
      html,
    };

    await transporter.sendMail(mailOptions);
  }

  async activateUser(req: Request, res: Response) {
    try {
      const { activation_token, activation_code } =
        req.body as IActivationRequest;

      console.log(req.body);

      const newUser: { user: IUser; activationCode: string } = jwt.verify(
        activation_token,
        process.env.ACTIVATION_SECRET as string
      ) as { user: IUser; activationCode: string };

      console.log(newUser);

      if (newUser.activationCode !== activation_code) {
        return {
          status: HttpStatus.BadRequest,
          data: {
            success: false,
            message: "Invalid Activation Code",
          },
        };
      }

      const { name, email, password } = newUser.user;
      const isEmailExist = await this.userRepository.checkExistUser(email);
      console.log(isEmailExist);
      if (isEmailExist.data) {
        return {
          status: HttpStatus.ServerError,
          data: {
            success: false,
            message: "Account Exist already",
          },
        };
      }

      const user = await this.userRepository.createUser({
        name,
        email,
        password,
      });
      if (user.data) {
        return {
          status: HttpStatus.Success,
          data: {
            success: true,
            message: "User Activation Success",
          },
        };
      }
      res.status(201).json({
        success: true,
      });
    } catch (error) {
      res.status(500).send({
        success: false,
        message: "server error",
      });
    }
  }

  async loginUser(req: Request, res: Response) {
    try {
      const { email, password } = req.body as ILoginRequest;

      if (!email || !password) {
        return {
          status: HttpStatus.BadRequest,
          data: {
            success: false,
            message: "Please enter email & password",
          },
        };
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      //const passwordRegex =/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
      if (!emailRegex.test(email)) {
        return {
          status: HttpStatus.NotFound,
          data: {
            success: false,
            message: "Invalid email or password format",
          },
        };
      }

      const user = await this.userRepository.authenticateUser(req.body);

      if (!user.data) {
        return {
          status: HttpStatus.NotFound,
          data: {
            success: false,
            message: "Invalid email or password",
          },
        };
      }

      sendToken(user.data, 200, res);
    } catch (error) {
      res.status(500).send({
        success: false,
        message: "server error",
      });
    }
  }

  async logoutUser(req: Request, res: Response) {
    try {
      res.cookie("access_token", "", { maxAge: 1 });
      res.cookie("refresh_token", "", { maxAge: 1 });
      return {
        status: HttpStatus.Success,
        data: {
          success: true,
          message: "Logged Out successfully",
        },
      };
    } catch (error) {
      res.status(500).send({
        success: false,
        message: "server error",
      });
    }
  }
}

export default UserUsecase;
