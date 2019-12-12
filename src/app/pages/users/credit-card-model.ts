export class ClienteModel {
  id: number;
  documento: string;
  primerNombre: string;
  segundoNombre: string;
  primerApellido: string;
  segundoApellido: string;
  fechaNacimiento: Date;
  celular: string;
  direccion: string;
  email: string;
}

export class InformacionLaboralModel {
  id: number;
  idCliente: ClienteModel;
  ocupacionLaboral: string;
  profesion: string;
  ingresos: number;

}

export class InformacionTarjetaModel {
  id: number;
  monto_aprobado: number;
  monto_gastado: number;
  num_tarjeta: string;
  tipo: string;
  diaPago: number;
  cvv: number;
  fechaFinal: string;
  bloqueo: boolean;
  IdUsers: ClienteModel;
}