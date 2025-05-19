export interface Service {
  serviceId?: string;
  clientId?: string;
  bill?: number;
  datetimeOpen?: Date;
  datetimeClose?: Date;
  // Puedes agregar más campos según las relaciones si lo necesitas
} 