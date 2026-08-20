import { type DropdownOption } from '../types';

/**
 * Resolves slotProps that can be a plain object or a function receiving ownerState,
 * then merges with defaultProps. Arrays in `sx` are concatenated rather than overwritten.
 */
export const resolveSlotProps = <TOwnerState = unknown>(
  userSlotProps:
    | ((ownerState: TOwnerState) => object)
    | object
    | undefined,
  defaultProps: object | null,
  ownerState: TOwnerState,
): Record<string, unknown> => {
  const resolvedUser: Record<string, unknown> =
    typeof userSlotProps === 'function'
      ? (userSlotProps(ownerState) as Record<string, unknown>)
      : ((userSlotProps ?? {}) as Record<string, unknown>);

  const defaults = (defaultProps ?? {}) as Record<string, unknown>;
  const defaultSx = defaults['sx'];
  const userSx = resolvedUser['sx'];

  const mergedSx = [
    ...(defaultSx ? (Array.isArray(defaultSx) ? defaultSx : [defaultSx]) : []),
    ...(userSx ? (Array.isArray(userSx) ? userSx : [userSx]) : []),
  ];

  return {
    ...defaults,
    ...resolvedUser,
    ...(mergedSx.length > 0 ? { sx: mergedSx } : {}),
  };
};

export const parseFromValuesOrFunc = <T, U>(
  fn: ((arg: U) => T) | T | undefined,
  arg: U,
): T | undefined => (fn instanceof Function ? fn(arg) : fn);

export const getValueAndLabel = (
  option?: DropdownOption | null,
): { label: string; value: string } => {
  let label: string = '';
  let value: string = '';
  if (option) {
    if (typeof option !== 'object') {
      label = option;
      value = option;
    } else {
      label = option.label ?? option.value;
      value = option.value ?? label;
    }
  }
  return { label, value };
};
