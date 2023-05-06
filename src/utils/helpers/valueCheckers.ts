// This will assert your condition
// It will ALSO inform the compiler of this change, so can be useful for non-null assertions

// We can disable the assertions during runtime in release mode, if they are ever expensive (not important atm)
export function assertIsTrue(
    condition: boolean,
    errorMessage?: string
  ): asserts condition {
    if (!condition) {
      throw new Error(errorMessage ?? "Assertion failed");
    }
  }
  
  // Use this instead of the !! operator to check if something is a real value
  // Note that assertHasValue(0), assertHasValue([]) and assertHaveValue('') all return true.
  // https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-7.html
  export function assertHasValue<T>(
    val: T,
    errorMessage?: string
  ): asserts val is NonNullable<T> {
    if (!hasValue(val)) {
      throw new Error(
        errorMessage ?? `Expected 'val' to be defined, but received ${val}`
      );
    }
  }
  
  // Use this instead of the !! operator to check if something is a real value
  // Note that assertHasValue(0), assertHasValue([]) and assertHaveValue('') all return true.
  // see above
  export function hasValue<T>(val: T): boolean {
    return !(val === undefined || val === null);
  }
  
  // https://stackoverflow.com/questions/175739/how-can-i-check-if-a-string-is-a-valid-number
  export function isInteger(str: string) {
    assertIsTrue(typeof str === "string");
    return (
      !Number.isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
      !Number.isNaN(parseInt(str, 10))
    ); // ...and ensure strings of whitespace fail
  }
  
  // restrict / ancchor the given value x to fit between min and max (inclusive)
  export const restrictRange = (x: number, min: number, max: number) => {
    if (x < min) return min;
    else if (x > max) return max;
    else return x;
  };
  
  export const isObject = <T>(object: T): boolean => {
    return object != null && typeof object === "object";
  };
  
  export const isAnArray = <T>(value: T | T[]): boolean => {
    return Array.isArray(value);
  };
  
  // This is like the Partial<T> type, but it goes deep!
  // https://stackoverflow.com/questions/61132262/typescript-deep-partial
  export type DeepPartial<T> = T extends object
    ? {
        [P in keyof T]?: DeepPartial<T[P]>;
      }
    : T;
  
  export type Subset<K> = {
    [attr in keyof K]?: K[attr] extends object
      ? Subset<K[attr]>
      : K[attr] extends object | null
      ? Subset<K[attr]> | null
      : K[attr] extends object | null | undefined
      ? Subset<K[attr]> | null | undefined
      : K[attr];
  };
  