export default interface IUser {
  readonly id?: number;
  readonly firstName?: string;
  readonly lastName?: string;
  readonly email: string;
  readonly password?: string;
  readonly jwtToken?: string;
}
