export class User {
  id: string;
  username: string;
  email: string;
  password: string;
  fullName?: string;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}