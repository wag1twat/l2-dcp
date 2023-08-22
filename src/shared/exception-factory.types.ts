interface Property {
  message: string;
}

export interface ExceptionFactoryType {
  property: Property | ExceptionFactoryType;
}
