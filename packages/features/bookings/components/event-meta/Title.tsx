import classNames from "@calcom/lib/classNames";

interface EventTitleProps {
  children: React.ReactNode;
  /**
   * Option to override the default h1 tag.
   */
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";
  className?: string;
}

export const EventTitle = ({ children, as, className }: EventTitleProps) => {
  const El = as || "h1";
  //console.log(children);
  // meibers
  //if (children && !children.includes("Termin")) {
        const pattern = /.*[Tt]ermin.*/;
  if (children && !pattern.test(children)) {
    return (
      <El data-testid="event-title" className={classNames("text-text text-xl font-semibold", className)}>
        {children}
      </El>
    )
  } else {
          return null;
 } 
}
