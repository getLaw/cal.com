import type { TFunction } from "next-i18next";

import dayjs from "@calcom/dayjs";
import { formatPrice } from "@calcom/lib/price";
import { TimeFormat } from "@calcom/lib/timeFormat";
import type { CalendarEvent, Person } from "@calcom/types/Calendar";

import {
  BaseEmailHtml,
  Info,
  LocationInfo,
  ManageLink,
  WhenInfoMeibers,
  WhoInfoMeibers,
  AppsStatus,
  UserFieldsResponses,
} from "../components";
import { sanitizePropEmailTitleToMeibers } from "../../lib/sanitizePropEmailTitleToMeibers";

export const BaseScheduledEmail = (
  props: {
    calEvent: CalendarEvent;
    attendee: Person;
    timeZone: string;
    includeAppsStatus?: boolean;
    t: TFunction;
    locale: "de";
    timeFormat: TimeFormat | undefined;
    isOrganizer?: boolean;
  } & Partial<React.ComponentProps<typeof BaseEmailHtml>>
) => {
  const { t, timeZone, locale, timeFormat: timeFormat_ } = props;

  const timeFormat = timeFormat_ ?? TimeFormat.TWENTY_FOUR_HOUR;

  function getRecipientStart(format: string) {
    return dayjs(props.calEvent.startTime).tz(timeZone).format(format);
  }

  function getRecipientEnd(format: string) {
    return dayjs(props.calEvent.endTime).tz(timeZone).format(format);
  }

  /*
  const subject = t(props.subject || "confirmed_event_type_subject", {
    eventType: props.calEvent.type,
    name: props.calEvent.team?.name || props.calEvent.organizer.name,
    date: `${getRecipientStart("h:mma")} - ${getRecipientEnd("h:mma")}, ${t(
      getRecipientStart("dddd").toLowerCase()
    )}, ${t(getRecipientStart("MMMM").toLowerCase())} ${getRecipientStart("D, YYYY")}`,
  });
*/

const subjectRaw = t(props.subject || "confirmed_event_type_subject", {
  eventType: null,
  name: props.calEvent.team?.name || props.calEvent.organizer.name,
  date: null,
});

//const subject = sanitizeSubjectToMeibers(subjectRaw);
const subject = subjectRaw;


const titleRaw = t(
  props.title
    ? props.title
    : props.calEvent.recurringEvent?.count
    ? "your_event_has_been_scheduled_recurring"
    : "your_event_has_been_scheduled"
);
const titleMeibers  = titleRaw;

  return (

    <BaseEmailHtml
      hideLogo={Boolean(props.calEvent.platformClientId)}
      headerType={props.headerType || "checkCircle"}
      subject={props.subject || subject}
      title={titleMeibers}
      callToAction={
        props.callToAction === null
          ? null
          : props.callToAction || <ManageLink attendee={props.attendee} calEvent={props.calEvent} />
      }
      // meibers
      subtitle={!props.calEvent.cancellationReason && props.subtitle ? props.subtitle : <>{t("emailed_you_and_any_other_attendees")}</>}>
      {props.calEvent.cancellationReason && (
        <Info
          label={t(
            props.calEvent.cancellationReason.startsWith("$RCH$")
              ? "reason_for_reschedule"
              : "Grund der Absage"
          )}
          description={
            !!props.calEvent.cancellationReason && props.calEvent.cancellationReason.replace("$RCH$", "")
          } // Removing flag to distinguish reschedule from cancellation
          withSpacer
        />
      )}
      <Info label={t("rejection_reason")} description={props.calEvent.rejectionReason} withSpacer />
      <WhenInfoMeibers timeFormat={timeFormat} calEvent={props.calEvent} t={t} timeZone={timeZone} locale={locale} />
      <WhoInfoMeibers calEvent={props.calEvent} t={t} />
      <LocationInfo calEvent={props.calEvent} t={t} />
      
      <UserFieldsResponses t={t} calEvent={props.calEvent} isOrganizer={props.isOrganizer} />
      {props.calEvent.paymentInfo?.amount && (
        <Info
          label={props.calEvent.paymentInfo.paymentOption === "HOLD" ? t("no_show_fee") : t("price")}
          description={formatPrice(
            props.calEvent.paymentInfo.amount,
            props.calEvent.paymentInfo.currency,
            props.attendee.language.locale
          )}
          withSpacer
        />
      )}
    </BaseEmailHtml>
  );
};