export interface Project {
  title: string;
  description: string;
}

export interface Portfolio {
  _id?: string;
  fullName: string;
  aboutMe: string;
  skills: string[];
  projects: Project[];
  achievements: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
}