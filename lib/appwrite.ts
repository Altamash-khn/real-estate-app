import { Property } from "@/app/(root)/(tabs)";
import * as Linking from "expo-linking";
import { openAuthSessionAsync } from "expo-web-browser";
import {
  Account,
  Avatars,
  Client,
  Databases,
  OAuthProvider,
  Query,
} from "react-native-appwrite";

export const config = {
  platform: "com.ayan.realState",
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
  databaseId: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID,
  agentsCollectionId: process.env.EXPO_PUBLIC_APPWRITE_AGENTS_COLLECTION_ID,
  galleriesCollectionId:
    process.env.EXPO_PUBLIC_APPWRITE_GALLERIES_COLLECTION_ID,
  reviewsCollectionId: process.env.EXPO_PUBLIC_APPWRITE_REVIEWS_COLLECTION_ID,
  propertiesCollectionId:
    process.env.EXPO_PUBLIC_APPWRITE_PROPERTIES_COLLECTION_ID,
};

export const client = new Client()
  .setEndpoint(config.endpoint!)
  .setProject(config.projectId!)
  .setPlatform(config.platform!);

export const avatar = new Avatars(client);
export const account = new Account(client);
export const databases = new Databases(client);

interface GetPropertiesParams {
  filter: string;
  query: string;
  limit?: number;
}

export async function login() {
  try {
    const redirectUri = Linking.createURL("/");

    const response = await account.createOAuth2Token(
      OAuthProvider.Google,
      redirectUri,
    );
    if (!response) throw new Error("Create OAuth2 token failed");

    const browserResult = await openAuthSessionAsync(
      response.toString(),
      redirectUri,
    );
    if (browserResult.type !== "success")
      throw new Error("Create OAuth2 token failed");

    const url = new URL(browserResult.url);
    const secret = url.searchParams.get("secret")?.toString();
    const userId = url.searchParams.get("userId")?.toString();
    if (!secret || !userId) throw new Error("Create OAuth2 token failed");

    const session = await account.createSession(userId, secret);
    if (!session) throw new Error("Failed to create session");

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function logout() {
  try {
    await account.deleteSessions();
    return true;
  } catch (error) {
    console.log("Logout error or success:", error);
    return true;
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

export async function getLatestProperties() {
  try {
    const results = await databases.listDocuments(
      config.databaseId!,
      config.propertiesCollectionId!,
      [Query.orderAsc("$createdAt"), Query.limit(10)],
    );
    return results.documents as unknown as Property[];
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getProperties({
  filter,
  query,
  limit,
}: GetPropertiesParams) {
  try {
    const buildQuery = [Query.orderDesc("$createdAt")];

    if (filter && filter !== "All") {
      buildQuery.push(Query.equal("type", filter));
    }

    if (query) {
      buildQuery.push(
        Query.or([
          Query.contains("name", query),
          Query.contains("type", query),
          Query.contains("address", query),
        ]),
      );
    }

    if (limit) {
      buildQuery.push(Query.limit(limit));
    }

    const results = await databases.listDocuments(
      config.databaseId!,
      config.propertiesCollectionId!,
      buildQuery,
    );

    return results.documents as unknown as Property[];
  } catch (error) {
    console.error(error);
    return [];
  }
}

// export async function getPropertyById({ id }: { id: string }) {
//   try {
//     const result = await databases.getDocument(
//       config.databaseId!,
//       config.propertiesCollectionId!,
//       id,
//     );
//     return result;
//   } catch (error) {
//     console.error(error);
//     return null;
//   }
// }

export async function getPropertyById({ id }: { id: string }) {
  try {
    const property = await databases.getDocument(
      config.databaseId!,
      config.propertiesCollectionId!,
      id,
    );

    // 👉 Fetch agent
    const agent = await databases.getDocument(
      config.databaseId!,
      config.agentsCollectionId!,
      property.agent,
    );

    // 👉 Fetch reviews
    const reviewsRes = await databases.listDocuments(
      config.databaseId!,
      config.reviewsCollectionId!,
      [Query.equal("$id", property.$id)],
    );

    // 👉 Fetch gallery
    const galleryRes = await databases.listDocuments(
      config.databaseId!,
      config.galleriesCollectionId!,
      [Query.equal("$id", property.$id)],
    );

    return {
      ...property,
      agent,
      reviews: reviewsRes.documents,
      gallery: galleryRes.documents,
    };
  } catch (error) {
    console.error(error);
    return null;
  }
}
