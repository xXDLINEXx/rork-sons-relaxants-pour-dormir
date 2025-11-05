// ⚠️ Dynamic require() is not supported in Metro bundler.
// In Rork / Web environment, we return undefined so the app can start.
// On real device with local assets, this file will be replaced.

export function tryRequire(_: string): number | undefined {
  return undefined;
}
