export interface IConstructClientState {
  secret: string;
  appBuild?: string;
  appVersion?: string;
}

export interface IConstructAuthenticatedClientState extends IConstructClientState {
  token: string;
}

