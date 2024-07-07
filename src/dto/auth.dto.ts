import UserEntity from 'src/entities/user.entity';

export class AuthResponseDto {
  id: number;
  username: string;
  permission: string;

  constructor({ id, username, permission }) {
    this.id = id;
    this.username = username;
    this.permission = permission;
  }
}

export class AuthPayloadDto {
  username: string;
  password: string;
}

export class AuthPermission {
  token: string;
  expiredTime: number;

  constructor({ id, token, expiredTime }) {
    this.token = token;
    this.expiredTime = expiredTime;
  }
}

export class UserDto {
  name: string;
  email: string;
  role: string;
  content: string;

  constructor(user: UserEntity) {
    this.name = user.name;
    this.email = user.email;
    this.role = user.role.name;
    this.content = user.role.content;

    return { ...this };
  }
}
