import { supabase } from '@/lib/supabase';

// File upload utility
export const uploadFile = async (file: File, bucket: string, path?: string) => {
  const filePath = path ? `${path}/${file.name}` : file.name;
  
  const { data, error } = await supabase
    .storage
    .from(bucket)
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false
    });

  if (error) {
    throw new Error(`Upload failed: ${error.message}`);
  }

  return data;
};

// Get public URL for a file
export const getFileUrl = async (bucket: string, filePath: string) => {
  const { data } = await supabase
    .storage
    .from(bucket)
    .getPublicUrl(filePath);

  return data.publicUrl;
};

// Delete file from storage
export const deleteFile = async (bucket: string, filePath: string) => {
  const { error } = await supabase
    .storage
    .from(bucket)
    .remove([filePath]);

  if (error) {
    throw new Error(`Delete failed: ${error.message}`);
  }
};

// List files in a bucket/path
export const listFiles = async (bucket: string, path?: string) => {
  const { data, error } = await supabase
    .storage
    .from(bucket)
    .list(path || '');

  if (error) {
    throw new Error(`List failed: ${error.message}`);
  }

  return data;
};