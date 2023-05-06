import { ClassValue, clsx } from "clsx"
import moment, { Moment } from "moment"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function createNamespacedComponent<
  T extends React.JSXElementConstructor<any>,
  U
>(getComponent: () => T, namespaceMembers: U): T & U {
  const NamespaceComponent = getComponent()
  return Object.assign(NamespaceComponent, namespaceMembers)
}

enum DateFormats {
  time = "h:mma",
  day = "dddd",
  week = "W",
  month = "MMMM",
  year = "YYYY",
  searchTime = "h:00a",
  dateTime = "DD/MM/YYYY HH:mma", // 'Do, h:mma',
  shortDateOnly = "DD/MM/YYYY",
  readableShortDate = "DD MMM",
  dateNoTime = "dddd Do MMMM YYYY",
  dateTimeServer = "YYYY-MM-DDThh:mm:ss.sssZ",
  analyticsHitTS = "YYYY-MM-DDTHH:mm:ssZ",
  default = "ddd Do MMMM YYYY h:mma",
}
type DateFormatsKey = keyof typeof DateFormats

export const formatDate = (
  DateTimeStamp: number | string | Moment,
  format?: DateFormatsKey,
  withUtc = null,
  isUnixTime = false
) => {
  const utcDate = moment.utc(DateTimeStamp).format("YYYY-MM-DD HH:mm:ss")
  const stillUtc = moment.utc(utcDate).toDate()
  const local = moment(!withUtc ? stillUtc : DateTimeStamp)
    .local()
    .format("YYYY-MM-DD HH:mm:ss")

  let dateActual: number | string | Moment

  if (!isUnixTime) {
    dateActual = local
  } else {
    const dateValue: number = DateTimeStamp as number
    dateActual = moment.unix(dateValue)
  }

  return moment(dateActual).format(DateFormats[format ?? "default"])
}
