import AsyncStorage
from "@react-native-async-storage/async-storage";

/* ACCESS TOKEN */
export const saveAccessToken =
  async (
    token: string
  ) => {

    await AsyncStorage.setItem(
      "accessToken",
      token
    );
};

export const getAccessToken =
  async () => {

    return await AsyncStorage.getItem(
      "accessToken"
    );
};

/* REFRESH TOKEN */
export const saveRefreshToken =
  async (
    token: string
  ) => {

    await AsyncStorage.setItem(
      "refreshToken",
      token
    );
};

export const getRefreshToken =
  async () => {

    return await AsyncStorage.getItem(
      "refreshToken"
    );
};

/* USER */
export const saveUser =
  async (
    user: any
  ) => {

    await AsyncStorage.setItem(

      "user",

      JSON.stringify(user)
    );
};

export const getUser =
  async () => {

    const user =
      await AsyncStorage.getItem(
        "user"
      );

    return user
      ? JSON.parse(user)
      : null;
};

/* CLEAR */
export const clearStorage =
  async () => {

    await AsyncStorage.multiRemove([

      "accessToken",

      "refreshToken",

      "user",

    ]);
};

/* BOOKMARKS */
export const saveBookmarkedBusinesses = async (bookmarks: Record<string, boolean>) => {
  await AsyncStorage.setItem("bookmarkedBusinesses", JSON.stringify(bookmarks));
};

export const getBookmarkedBusinesses = async (): Promise<Record<string, boolean>> => {
  const bookmarks = await AsyncStorage.getItem("bookmarkedBusinesses");
  return bookmarks ? JSON.parse(bookmarks) : {};
};