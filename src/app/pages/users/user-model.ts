export class UserModel {
  Id: number;
  Document: string;
  Names: string;
  LastName: string;
  SecondLastName: string;
  Birthday: Date;
  Phone: string;
  Address: string;
  Email: string;
}

export class FinancialModel {
  Id: number;
  Occupation: string;
  Profession: string;
  Incomes: number;
  IdUsers: UserModel;
}

export class CardModel {
  Id: number;
  Amount: number;
  Type: string;
  PayDay: number;
  Cvv: number;
  EndDate: string;
  Blocked: boolean;
  IdUsers: UserModel;
}
