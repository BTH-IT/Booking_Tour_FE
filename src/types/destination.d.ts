export interface IDestination {
  id: string;
  name: string;
  desc: string;
  image: string;
  map: string;
  createAt: Date;
  updateAt: Date;
  deleteAt: Date;
}

export interface ILocation {
  name: string;
  code: number;
  division_type: string;
  codename: string;
  phone_code: number;
  districts: any;
}
