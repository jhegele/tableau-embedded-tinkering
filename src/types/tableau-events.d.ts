declare module "https://public.tableau.com/javascripts/api/tableau.embedding.3.latest.min.js" {
  declare enum TableauEventType {
    FirstInteractive = "firstinteractive",
    FilterChanged = "filterchanged",
    MarkSelectionChanged = "markselectionchanged",
    ParameterChanged = "parameterchanged",
    StoryPointSwitched = "storypointswitched",
    TabSwitched = "tabswitched",
  }

  type EventListenerCallbacks = {
    [TableauEventType.MarkSelectionChanged]: (
      event: MarksSelectedEvent
    ) => void;
    [TableauEventType.FirstInteractive]: (viz: TableauViz) => void;
  };
}
