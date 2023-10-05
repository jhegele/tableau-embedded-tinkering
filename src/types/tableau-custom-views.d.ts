declare module "https://public.tableau.com/javascripts/api/tableau.embedding.3.latest.min.js" {
  export interface CustomView {
    default: boolean;
    name: string;
    ownerName: string;
    shared: boolean;
    url: string;
    workbook: Workbook;
    saveAsync: () => Promise<CustomView>;
  }
}
