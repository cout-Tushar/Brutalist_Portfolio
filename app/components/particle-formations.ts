export const phrases = ["TUSHAR MISHRA", "FULL STACK DEVELOPER", "BUILD."];

export function sampleFormations(width: number, height: number, count: number) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) throw new Error("Text sampling unavailable");
  return phrases.map((phrase) => {
    const lines =
      width < 620 && phrase.includes(" ")
        ? phrase === phrases[0]
          ? ["TUSHAR", "MISHRA"]
          : ["FULL STACK", "DEVELOPER"]
        : [phrase];
    const font = "900 120px Arial, Helvetica, sans-serif";
    ctx.font = font;
    const lineHeight = 108;
    canvas.width =
      Math.ceil(Math.max(...lines.map((line) => ctx.measureText(line).width))) +
      8;
    canvas.height = lineHeight * lines.length;
    ctx.font = font;
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    lines.forEach((line, i) =>
      ctx.fillText(line, canvas.width / 2, i * lineHeight + 96),
    );
    const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    const ink: number[] = [];
    for (let i = 3; i < pixels.length; i += 4) {
      if (pixels[i] > 160) ink.push(i >>> 2);
    }
    const scale = Math.min(
      (width * 0.93) / canvas.width,
      (height * 0.81) / canvas.height,
      2.3,
    );
    const coords = new Float32Array(count * 3);
    for (let i = 0; i < coords.length; i += 3) {
      const pixel = ink[Math.floor(Math.random() * ink.length)];
      coords[i] =
        ((pixel % canvas.width) + Math.random() - canvas.width / 2) * scale;
      coords[i + 1] =
        (canvas.height / 2 - Math.floor(pixel / canvas.width) - Math.random()) *
        scale;
      coords[i + 2] = (Math.random() - 0.5) * Math.min(width, height) * 0.065;
    }
    return { coords, area: ink.length * scale * scale };
  });
}
