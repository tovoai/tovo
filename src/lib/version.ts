import pkg from '../../../package.json';

export function getAppVersion(): string {
  return pkg.version || '1.06.00';
}
