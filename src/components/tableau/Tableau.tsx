"use client";

import { ComponentPropsWithoutRef, useEffect, useRef } from "react";
import {
  DeviceType,
  TableauEventType,
  TableauViz,
  Toolbar,
} from "https://public.tableau.com/javascripts/api/tableau.embedding.3.latest.min.js";

export interface TableauProps extends ComponentPropsWithoutRef<"div"> {
  src: string;
  toolbar?: Toolbar;
  device?: DeviceType;
  hideTabs?: boolean;
  width?: string | number;
  onFirstInteractive?: (viz: TableauViz) => void;
}

export const Tableau: React.FC<TableauProps> = ({
  src,
  toolbar = Toolbar.Bottom,
  device = DeviceType.Default,
  hideTabs = false,
  onFirstInteractive,
  width,
  ...divProps
}) => {
  const vizDivRef = useRef<HTMLDivElement>(null);
  const viz = useRef<TableauViz | null>(null);

  useEffect(() => {
    if (vizDivRef.current && viz.current === null) {
      vizDivRef.current.innerHTML = "";
      const v = new TableauViz();
      v.src = src;
      v.toolbar = toolbar;
      v.device = device;
      v.hideTabs = hideTabs;
      if (width) v.width = width;
      if (onFirstInteractive !== undefined) {
        v.addEventListener(TableauEventType.FirstInteractive, () =>
          onFirstInteractive(v)
        );
      }
      vizDivRef.current.appendChild(v as any);
      viz.current = v;
    }
  }, [src, toolbar, device, hideTabs, onFirstInteractive, width]);

  return <div id="tableauViz" ref={vizDivRef} {...divProps}></div>;
};

export default Tableau;
