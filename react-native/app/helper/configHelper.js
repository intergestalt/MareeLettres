import { DYNAMIC_CONFIG } from '../config/config';

function addEntry(config, key) {
  const value = config.config[key];
  if (value) {
    DYNAMIC_CONFIG[key.toUpperCase()] = value;
  }
}

export function writeDynamicConfig(config) {
  const keys = Object.keys(config.config);

  for (let i = 0; i < keys.length; i += 1) {
    const key = keys[i];
    addEntry(config, key);
  }
}
