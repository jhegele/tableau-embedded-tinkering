declare module "https://public.tableau.com/javascripts/api/tableau.embedding.3.latest.min.js" {
  export interface MarksSelectedEvent {
    sheet: any;
    worksheet: any;
    getMarksAsync: () => void;
  }
}
