import _ from 'lodash';

export function getInputValueCastToArray(
  inputRef: React.RefObject<HTMLInputElement>
) {
  return _.get(inputRef, 'current.value', '')
    .split(/[^a-zA-Z0-9]+/)
    .filter(Boolean);
}
