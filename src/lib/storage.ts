import { supabase } from './supabase';

/**
 * Upload a file to Supabase Storage
 * @param bucket - The storage bucket name ('avatars' or 'portfolios')
 * @param filePath - The path where the file will be stored (e.g., 'user-id/filename.jpg')
 * @param file - The file to upload
 * @returns The public URL of the uploaded file
 */
export async function uploadFile(
    bucket: 'avatars' | 'portfolios',
    filePath: string,
    file: File
): Promise<string> {
    const { data, error } = await supabase.storage
        .from(bucket)
        .upload(filePath, file, {
            cacheControl: '3600',
            upsert: true,
        });

    if (error) {
        throw new Error(`Error uploading file: ${error.message}`);
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
        .from(bucket)
        .getPublicUrl(data.path);

    return publicUrl;
}

/**
 * Delete a file from Supabase Storage
 * @param bucket - The storage bucket name
 * @param filePath - The path of the file to delete
 */
export async function deleteFile(
    bucket: 'avatars' | 'portfolios',
    filePath: string
): Promise<void> {
    const { error } = await supabase.storage
        .from(bucket)
        .remove([filePath]);

    if (error) {
        throw new Error(`Error deleting file: ${error.message}`);
    }
}

/**
 * Upload avatar image for a user
 * @param userId - The user's ID
 * @param file - The image file
 * @returns The public URL of the uploaded avatar
 */
export async function uploadAvatar(userId: string, file: File): Promise<string> {
    const fileExt = file.name.split('.').pop();
    const fileName = `${userId}/avatar.${fileExt}`;
    return uploadFile('avatars', fileName, file);
}

/**
 * Upload portfolio image
 * @param userId - The user's ID
 * @param file - The image file
 * @returns The public URL of the uploaded image
 */
export async function uploadPortfolioImage(userId: string, file: File): Promise<string> {
    const fileExt = file.name.split('.').pop();
    const fileName = `${userId}/${Date.now()}.${fileExt}`;
    return uploadFile('portfolios', fileName, file);
}

/**
 * Delete portfolio image
 * @param imageUrl - The full URL of the image to delete
 */
export async function deletePortfolioImage(imageUrl: string): Promise<void> {
    // Extract the file path from the URL
    const urlParts = imageUrl.split('/');
    const bucket = urlParts[urlParts.length - 3];
    const userId = urlParts[urlParts.length - 2];
    const fileName = urlParts[urlParts.length - 1];
    const filePath = `${userId}/${fileName}`;

    if (bucket === 'portfolios') {
        await deleteFile('portfolios', filePath);
    }
}
