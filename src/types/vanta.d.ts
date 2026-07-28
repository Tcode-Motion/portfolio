declare module 'vanta/dist/vanta.birds.min' {
  const VantaBirds: (options: Record<string, unknown>) => { destroy: () => void };
  export default VantaBirds;
}

declare module 'vanta/dist/vanta.net.min' {
  const VantaNet: (options: Record<string, unknown>) => { destroy: () => void };
  export default VantaNet;
}
