export type LoginProps = {
  gotrue: any
}

export type PeliculasProps = {
  data: any
}

export type PeliculaEditProps = {
  data: any
}




export type EditIconProps = {
  editData:any
}

export type DeleteIconProps = {
  deleteData:any
}

export type TurnSelectProps = {
  movieData:any
}

export type TurnosProps = {
  data: any
}

export type TurnEditProps={
  data:any
}

export type PerfilProps = {
  user:any
}

export type AdministradoresProps = {
  user: any
}

export interface SignUpValues {
  name: string;
  email: string;
  password: string;
}

export interface LoginValues {
  email: string;
  password: string;
}

export interface Pelicula {
  id: string;
  name: string;
  publication_date: number;
  isActive: boolean;
  assigned_turns?: number
}

export interface Turno {
  id: number;
  hour: string;
  isActive: boolean;
  assigned_movie?: string;
}

