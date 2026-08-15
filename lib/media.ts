const API_URL =
  process.env.NEXT_PUBLIC_API_URL ??
  "http://localhost:3000/api/v1";

const MEDIA_BASE_URL = API_URL.replace(
  /\/api\/v1\/?$/,
  "",
);

export function mediaUrl(
  filePath?: string | null,
) {
  if (!filePath) {
    return undefined;
  }

  return `${MEDIA_BASE_URL}/${filePath.replace(/^\/+/, "")}`;
}
