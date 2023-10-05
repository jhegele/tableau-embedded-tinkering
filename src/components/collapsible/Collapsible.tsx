import {
  AnimatePresence,
  type MotionStyle,
  motion,
  type AnimationProps,
  HTMLMotionProps,
} from "framer-motion";
import { PropsWithChildren } from "react";

export interface CollapsibleProps extends HTMLMotionProps<"div"> {
  open: boolean;
  animateToX?: "left" | "right";
  animateToY?: "top" | "bottom";
  removeOnExit?: boolean;
}

export const Collapsible: React.FC<PropsWithChildren<CollapsibleProps>> = ({
  children,
  open,
  animateToX,
  animateToY,
  removeOnExit,
  ...rest
}) => {
  const motionStyle: MotionStyle = {};
  const initial: AnimationProps["initial"] = {};
  const animate: AnimationProps["animate"] = {};
  const exit: AnimationProps["exit"] = {};
  if (animateToX) {
    if (animateToX === "left") motionStyle.originX = 0;
    if (animateToX === "right") motionStyle.originX = 1;
    initial.width = "0px";
    animate.width = "auto";
    exit.width = "0px";
    initial.scaleX = 0;
    animate.scaleX = 1;
    exit.scaleX = 0;
  }
  if (animateToY) {
    if (animateToY === "top") motionStyle.originY = 0;
    if (animateToY === "bottom") motionStyle.originY = 1;
    initial.height = "0px";
    animate.height = "auto";
    exit.height = "0px";
    initial.scaleY = 0;
    animate.scaleY = 1;
    exit.scaleY = 0;
  }

  if (removeOnExit)
    return (
      <AnimatePresence>
        {open && (
          <motion.div
            {...rest}
            initial={initial}
            animate={animate}
            exit={exit}
            style={motionStyle}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    );

  return (
    <motion.div
      {...rest}
      animate={open ? "open" : "closed"}
      variants={{
        open: animate,
        closed: exit,
      }}
      // initial={initial}
      // animate={animate}
      // exit={exit}
      style={motionStyle}
    >
      {children}
    </motion.div>
  );
};
