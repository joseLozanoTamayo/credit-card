import { ClienteModel, InformacionLaboralModel, InformacionTarjetaModel } from './credit-card-model';

export class RequestModel {
    cliente: ClienteModel;
    informacionLaboral: InformacionLaboralModel;
    informacionTarjeta: InformacionTarjetaModel;
}