declare module "https://public.tableau.com/javascripts/api/tableau.embedding.3.latest.min.js" {
  export enum Toolbar {
    Bottom = "bottom",
    Hidden = "hidden",
    Top = "top",
  }

  export enum DeviceType {
    Default = "default",
    Desktop = "desktop",
    Phone = "Phone",
    Tablet = "Tablet",
  }

  export enum SheetType {
    Dashboard = "dashboard",
    Story = "story",
    Worksheet = "worksheet",
  }

  export enum SheetSizeBehavior {
    AtLeast = "atleast",
    AtMost = "atmost",
    Automatic = "automatic",
    Exactly = "exactly",
    Range = "range",
  }

  export enum PeriodType {
    Days = "days",
    Hours = "hours",
    Minutes = "minutes",
    Months = "months",
    Quarters = "quarters",
    Seconds = "seconds",
    Weeks = "weeks",
    Years = "years",
  }

  export enum DataType {
    Bool = "bool",
    Date = "date",
    DateTime = "date-time",
    Float = "float",
    Int = "int",
    Spacial = "spacial",
    String = "string",
  }
}
