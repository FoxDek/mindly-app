type ShakeTrigger = () => void;

const shakeRegistry = new Map<string | number, ShakeTrigger>();

export const registerShake = (id: string | number, trigger: ShakeTrigger) => {
  shakeRegistry.set(id, trigger);
};

export const unregisterShake = (id: string | number) => {
  shakeRegistry.delete(id);
};

export const triggerShakeById = (id: string | number) => {
  const fn = shakeRegistry.get(id);
  if (fn) fn();
};
