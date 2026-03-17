import * as Linking from "expo-linking";
import * as WebBrowser from "expo-web-browser";
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
    const redirectUrl = Linking.createURL("/");

    // ✅ Build OAuth URL manually
    const authUrl = `${config.endpoint}/account/sessions/oauth2/${OAuthProvider.Google}?project=${config.projectId}&success=${encodeURIComponent(redirectUrl)}&failure=${encodeURIComponent(redirectUrl)}`;

    // ✅ Open browser for Google login
    const browserResult = await WebBrowser.openAuthSessionAsync(
      authUrl,
      redirectUrl,
    );

    if (browserResult.type !== "success") {
      throw new Error("Login cancelled");
    }

    // ✅ Get returned URL
    const url = new URL(browserResult.url);

    const secret = url.searchParams.get("secret");
    const userId = url.searchParams.get("userId");

    if (!secret || !userId) {
      throw new Error("Missing secret or userId");
    }

    // ✅ Create session
    const session = await account.createSession(userId, secret);

    if (!session) {
      throw new Error("Failed to create session");
    }

    return true;
  } catch (error) {
    console.log("LOGIN ERROR:", error);
    return false;
  }
}

export async function logout() {
  try {
    await account.deleteSession("current");
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function getUser() {
  try {
    const user = await account.get();

    if (user.$id) {
      const userAvatar = avatar.getInitials(user.name);

      return {
        ...user,
        avatar: userAvatar.toString(),
      };
    }
  } catch (error) {
    console.log(error);
    return null;
  }
}
