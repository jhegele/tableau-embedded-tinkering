declare module "https://public.tableau.com/javascripts/api/tableau.embedding.3.latest.min.js" {
  export enum ParameterValueType {
    All = "all",
    List = "list",
    Range = "Range",
  }

  export interface ParameterDomainRestriction {
    allowableValues: DataValue[];
    dateStepPeriod: PeriodType;
    maxValue: DataValue;
    minValue: DataValue;
    stepSize?: number;
    type: ParameterValueType;
  }

  export interface ParameterChangedEvent {}

  export interface Parameter {
    allowableValues: ParameterDomainRestriction;
    currentValue: DataValue;
    dataType: DataType;
    id: string;
    name: string;
    changeValueAsync: (
      newValue: string | number | boolean | Date
    ) => Promise<DataValue>;
  }
}
