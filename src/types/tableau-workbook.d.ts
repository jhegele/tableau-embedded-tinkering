declare module "https://public.tableau.com/javascripts/api/tableau.embedding.3.latest.min.js" {
  export interface Workbook {
    activeCustomView?: CustomView;
    activeSheet: Sheet;
    name: string;
    publishedSheetsInfo: SheetInfo[];
    activateSheetAsync: (sheetNameOrIndex: string | number) => Promise<Sheet>;
    changeParameterValueAsync: (
      name: string,
      value: string | number | boolean | Date
    ) => Promise<Parameter>;
    getCustomViewsAsync: () => Promise<CustomView[]>;
    getParametersAsync: () => Promise<Parameter[]>;
    removeCustomViewAsync: (customViewName: string) => Promise<CustomView>;
    revertAllAsync: () => void;
    saveCustomViewAsync: (customViewName: string) => Promise<CustomView>;
    setActiveCustomViewAsDefaultAsync: () => Promise<void>;
    showCustomViewAsync: (customViewName: string) => Promise<CustomView>;
  }
}
