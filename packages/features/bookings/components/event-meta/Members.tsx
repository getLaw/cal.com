import { useIsEmbed } from "@calcom/embed-core/embed-iframe";
import { useBookerStore } from "@calcom/features/bookings/Booker/store";
import type { BookerEvent } from "@calcom/features/bookings/types";
import { getBookerBaseUrlSync } from "@calcom/lib/getBookerUrl/client";
import { getTeamUrlSync } from "@calcom/lib/getBookerUrl/client";
import { SchedulingType } from "@calcom/prisma/enums";

export interface EventMembersProps {
  /**
   * Used to determine whether all members should be shown or not.
   * In case of Round Robin type, members aren't shown.
   */
  schedulingType: BookerEvent["schedulingType"];
  users: BookerEvent["users"];
  profile: BookerEvent["profile"];
  entity: BookerEvent["entity"];
}

export const EventMembers = ({ schedulingType, users, profile, entity }: EventMembersProps) => {
  const username = useBookerStore((state) => state.username);
  const isDynamic = !!(username && username.indexOf("+") > -1);
  const isEmbed = useIsEmbed();
  const showMembers = schedulingType !== SchedulingType.ROUND_ROBIN;
  const shownUsers = showMembers ? users : [];
  // In some cases we don't show the user's names, but only show the profile name.
  const showOnlyProfileName =
    (profile.name && schedulingType === SchedulingType.ROUND_ROBIN) ||
    !users.length ||
    (profile.name !== users[0].name && schedulingType === SchedulingType.COLLECTIVE);

  const orgOrTeamAvatarItem =
    isDynamic || (!profile.image && !entity.logoUrl) || !entity.teamSlug
      ? []
      : [
          {
            // We don't want booker to be able to see the list of other users or teams inside the embed
            href: isEmbed
              ? null
              : entity.teamSlug
              ? getTeamUrlSync({ orgSlug: entity.orgSlug, teamSlug: entity.teamSlug })
              : getBookerBaseUrlSync(entity.orgSlug),
            image: entity.logoUrl ?? profile.image ?? "",
            alt: entity.name ?? profile.name ?? "",
            title: entity.name ?? profile.name ?? "",
          },
        ];

  const getDateText = () => {
    const url = new URL(window.location.href);
    if (url.searchParams.get("slot")) {
      return <p className="text-subtle mb-1 mt-3 text-sm font-semibold">Datum und Uhrzeit:</p>;
    } else {
      return <p className="text-subtle mb-2 mt-3 text-sm font-semibold">Dauer des Termins:</p>;
    }
  };

  return (
    // meibers
    <>
      <p className="text-subtle mb-1 text-sm font-semibold">Termin mit:</p>
      <p className="text-emphasis font-semibold">
        {showOnlyProfileName
          ? profile.name
          : shownUsers
              .map((user) => user.name)
              .filter((name) => name)
              .join(", ")}
      </p>
      {getDateText()}
    </>
  );
};
