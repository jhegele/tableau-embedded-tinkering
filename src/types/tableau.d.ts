declare module "https://public.tableau.com/javascripts/api/tableau.embedding.3.latest.min.js" {
  export class TableauViz {
    constructor();
    public src: string;
    public toolbar: Toolbar;
    public device: DeviceType;
    public workbook: Workbook;
    public hideTabs?: boolean;
    public width?: string | number;

    public addEventListener: <T extends TableauEventType>(
      type: T,
      callback: EventListenerCallbacks[T]
    ) => void;
  }
}
