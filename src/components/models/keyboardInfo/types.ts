type ErrorString = string;

export type InfoErrors<T> = {
  [key in keyof T]: ErrorString;
};

export interface EventPayload<T> {
  value: Partial<T>;
  error: Partial<InfoErrors<T>>;
}
