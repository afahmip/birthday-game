type Nullable<T> = T | null;
type HashMap<K extends number | string, V> = { [id in K]: V };

export type { Nullable, HashMap };
