declare module "https://public.tableau.com/javascripts/api/tableau.embedding.3.latest.min.js" {
  export interface SheetSize {
    behavior: SheetSizeBehavior;
    maxSize?: any;
    minSize?: any;
  }

  export interface Worksheet {
    parentDashboard: Dashboard;
    applyFilterAsync: (
      fieldName: string,
      values: string[],
      updateType: FilterUpdateType,
      filterOptions: FilterOptions
    ) => Promise<string>;
    clearFilterAsync: (fieldName: string) => Promise<string>;
    clearSelectedMarksAsync: () => Promise<void>;
    getFiltersAsync: () => Promise<Filter[]>;
  }

  interface SheetBase {
    index: number;
    isActive: boolean;
    isHidden: boolean;
    name: string;
    size: SheetSize;
    url: string;
    workbook: Workbook;
    changeSizeAsync: (sheetSize: SheetSize) => Promise<SheetSize>;
  }

  export type Sheet =
    | ({
        sheetType: SheetType.Worksheet;
      } & SheetBase &
        Worksheet)
    | ({ sheetType: SheetType.Dashboard | SheetType.Story } & SheetBase);

  export interface SheetInfo {
    index: number;
    isActive: boolean;
    isHidden: boolean;
    name: string;
    sheetType: SheetType;
    size: SheetSize;
    url: string;
    workbook: Workbook;
  }
}
