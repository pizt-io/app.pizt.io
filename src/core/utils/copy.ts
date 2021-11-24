export const copyToClipboard = (newClip: string) => {
  navigator.clipboard.writeText(newClip);
}
