import * as Linking from "expo-linking";
import { Account, Avatars, Client, OAuthProvider } from "react-native-appwrite";

export const config = {
  platform: "com.ayan.realState",
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
};

export const client = new Client()
  .setEndpoint(config.endpoint!)
  .setProject(config.projectId!)
  .setPlatform(config.platform!);

export const avatar = new Avatars(client);
export const account = new Account(client);

export async function login() {
  try {
    const redirectUrl = Linking.createURL(path: "/");

    const response = await account.createOAuth2Token(
       OAuthProvider.Google,
      redirectUrl,
    );

    if(!response) throw new Error(message: "Failed to create OAuth2 token");

    const browserResult =  await openAuthSessionAsync(response.toString(), redirectUrl);

    if (browserResult.type !== "success") {
      throw new Error(message: "Failed to login");
    }

    const url = new URL(browserResult.url);

    const secrert = url.searchParams.get("secret")?.toString();
    const userId = url.searchParams.get("userId")?.toString();

    if (!secrert || !userId) {
      throw new Error(message: "Failed to retrieve secret or userId from URL");
    }

    const session = await account.createSession(userId, secrert);

    if (!session) {
      throw new Error(message: "Failed to create session");
    }

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}
