import { User } from "../../entities/User";
import { IMailProvider } from "../../providers/IMailProvider";
import { IUserRepository } from "../../repositories/IUserRepository";
import { ICreateUserRequestDTO } from "./CreateUserDTO";

export class CreateUserUseCase {
  // private usersRepository: IUserRepository

  // constructor(usersRepository: IUserRepository) {
  //   this.usersRepository = usersRepository;
  // }
  //
  // or
  constructor(
    private usersRepository: IUserRepository,
    private mailProvider: IMailProvider
  ) {}

  async execute(data: ICreateUserRequestDTO) {
    const userAlreadyExists = await this.usersRepository.findByEmail(
      data.email
    );

    if (userAlreadyExists) {
      throw new Error("User already exists.");
    }

    const user = new User(data);

    await this.usersRepository.save(user);

    await this.mailProvider.sendMail({
      to: {
        name: data.name,
        email: data.email,
      },
      from: {
        name: "Equipe do meu App",
        email: "equipe@meuapp.com",
      },
      subject: "Seja bem-vindo à Plataforma",
      body: "<p>Você já pode fazer login em nossa Plataforma.</p>",
    });
  }
}
