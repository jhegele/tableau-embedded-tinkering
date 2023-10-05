declare module "https://public.tableau.com/javascripts/api/tableau.embedding.3.latest.min.js" {
  export enum FilterUpdateType {
    Add = "add",
    All = "all",
    Remove = "remove",
    Replace = "replace",
  }

  export interface FilterOptions {
    isExcludeMode: boolean;
  }

  export enum FilterType {
    Categorical = "categorical",
    Hierarchical = "hierarchical",
    Range = "range",
    RelativeDate = "relative-date",
  }

  interface FilterBase {
    fieldId: string;
    fieldName: string;
    worksheetName: string;
  }

  type CategoricalFilter = FilterBase & {
    appliedValues: DataValue[];
    isAllSelected?: boolean;
    isExcludeMode: boolean;
  };

  type RangeFilter = FilterBase & {
    includeNullValues: boolean;
    maxValue: DataValue;
    minValue: DataValue;
  };

  export type Filter =
    | ({ filterType: FilterType.Categorical } & CategoricalFilter)
    | ({ filterType: FilterType.Range } & RangeFilter)
    | ({
        filterType: FilterType.Hierarchical | FilterType.RelativeDate;
      } & FilterBase);
}
