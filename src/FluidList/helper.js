function sizeToFont(size, text) {
  return size * 1.4 / text.length;
}

export function calcFont({text, baseFontSize, containerWidth, scaleBaseOnWidth = true}) {
  let fontSize = baseFontSize;
  if (scaleBaseOnWidth) {
    const scaleFontSize = sizeToFont(containerWidth * 2 / 4, text);
    fontSize = Math.max(fontSize, scaleFontSize);
  }
  const maxFontSize = sizeToFont(containerWidth - 2, text);
  return Math.min(maxFontSize, fontSize);
}
