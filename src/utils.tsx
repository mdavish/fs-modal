export function findUpdatedOffset(
  fullBody: string,
  bodyExcerpt: string,
  originalOffset: number
): number {
  // Remove ellipses 
  const trimmedExcerpt = bodyExcerpt.replace(/ ?\.{3}$/, '').replace(/^\.{3} ?/, '');
  // How many ellipses you removed
  const additionalOffset = bodyExcerpt.indexOf(trimmedExcerpt);
  const bodyOffset = fullBody.indexOf(trimmedExcerpt);
  return originalOffset + bodyOffset - additionalOffset
} 