import { markdownToSafeHTML } from "@calcom/lib/markdownToSafeHTML";
//import { sanitizeSubjectToMeibers } from "../../lib/sanitizeSubjectToMeibers";

const Spacer = () => <p style={{ height: 6 }} />;

export const Info = (props: {
  label: string;
  description: React.ReactNode | undefined | null;
  extraInfo?: React.ReactNode;
  withSpacer?: boolean;
  lineThrough?: boolean;
  formatted?: boolean;
}) => {
  if (!props.description || props.description === "") return null;



  /*
console.log("PROPS RAW");
console.log(props.description.toString());
@calcom/web:dev:   '$$typeof': Symbol(react.element),
@calcom/web:dev:   type: 'span',
@calcom/web:dev:   key: null,
@calcom/web:dev:   ref: null,
@calcom/web:dev:   props: {
@calcom/web:dev:     'data-testid': 'when',
@calcom/web:dev:     children: [ '', 'Freitag, 6. September 2024 | 11:15', ' - ', '11:30', ' ' ]
@calcom/web:dev:   },
@calcom/web:dev:   _owner: null,
@calcom/web:dev:   _store: {}


  

  if (props.description) {
    const descRaw = props.description;
    const sanitizedDescription = sanitizeSubjectToMeibers(descRaw);
  } else {
    const sanitizedDescription = props.description;
  }
  */
  console.log("DESCRIPTION");
 
  const descriptionCSS = "color: '#101010'; font-weight: 400; line-height: 24px; margin: 0;";

  const safeDescription = markdownToSafeHTML(props.description.toString()) || "";

  return (
    <>
      {props.withSpacer && <Spacer />}
      <div>
        <p style={{ color: "#101010" }}>{props.label}</p>
        <p
          style={{
            color: "#101010",
            fontWeight: 400,
            lineHeight: "24px",
            whiteSpace: "pre-wrap",
            //textDecoration: props.lineThrough ? "line-through" : undefined,
            textDecoration: undefined,
          }}>
          {props.formatted ? (
            <p
              className="dark:text-darkgray-600 mt-2 text-sm text-gray-500 [&_a]:text-blue-500 [&_a]:underline [&_a]:hover:text-blue-600"
              dangerouslySetInnerHTML={{
                __html: safeDescription
                  .replaceAll("<p>", `<p style="${descriptionCSS}">`)
                  .replaceAll("<li>", `<li style="${descriptionCSS}">`),
              }}
            />
          ) : (
            props.description
          )}
        </p>
        {props.extraInfo}
      </div>
    </>
  );
};
