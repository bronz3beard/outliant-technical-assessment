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

export const getDescendantPropObject = (
  obj: any,
  description: string
): string => {
  const arrList: string[] = description.split(".")
  let newObj = obj

  if (!arrList.length) {
    return newObj[description]
  }
  // "shift()" Removes the first element from an array and returns it. If the array is empty, undefined.
  // If the array is empty, undefined is returned and the array is not modified.
  while (arrList.length) {
    newObj = newObj[arrList.shift()!] as unknown as string
  }

  return newObj as string
}

// check if object is empty.
export const objectHasAttributes = (obj: Record<string, string>) =>
  Object.keys(obj).length > 0
