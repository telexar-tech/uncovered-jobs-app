import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Stores a string value.
 * @param key The key for the item.
 * @param value The string value to store.
 */
export const storeData = async (key: string, value: string): Promise<void> => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.error(`Error storing item with key "${key}":`, e);
  }
};

/**
 * Retrieves a string value.
 * @param key The key for the item.
 * @returns The retrieved value, or null if not found or on error.
 */
export const retrieveData = async (key: string): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem(key);
  } catch (e) {
    console.error(`Error retrieving item with key "${key}":`, e);
    return null;
  }
};

/**
 * Stores an object or array by converting it to a JSON string.
 * Uses a generic type `T` to accept any serializable value.
 * @param key The key for the item.
 * @param value The object or array to store.
 */
export const storeObject = async <T>(key: string, value: T): Promise<void> => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    console.error(`Error storing object with key "${key}":`, e);
  }
};

/**
 * Retrieves an object or array by parsing its JSON string.
 * Uses a generic type `T` to return a strongly-typed object.
 * @param key The key for the item.
 * @returns The retrieved object, or null if not found or on error.
 */
export const retrieveObject = async <T>(key: string): Promise<T | null> => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    // Use a type assertion `as T` because we trust the stored data's shape
    return jsonValue != null ? (JSON.parse(jsonValue) as T) : null;
  } catch (e) {
    console.error(`Error retrieving object with key "${key}":`, e);
    return null;
  }
};

/**
 * Removes an item from storage.
 * @param key The key of the item to remove.
 */
export const removeData = async (key: string): Promise<void> => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.error(`Error removing item with key "${key}":`, e);
  }
};

/**
 * Clears all data from AsyncStorage.
 */
export const clearAll = async (): Promise<void> => {
  try {
    await AsyncStorage.clear();
  } catch (e) {
    console.error('Error clearing all data from storage:', e);
  }
};

export const storageUtil = {
  storeData,
  retrieveData,
  storeObject,
  retrieveObject,
  removeData,
  clearAll,
};