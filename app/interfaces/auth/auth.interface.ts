export interface ILoginRequestBody {
  nim: string;
  password: string;
}

export interface ILoginResponseBody {
  accessToken: string;
  refreshToken: string;
}

export interface IMeResponseBody {
  id: string;
  fullname: string;
  email: string;
  nim: string;
  role: string;
}
