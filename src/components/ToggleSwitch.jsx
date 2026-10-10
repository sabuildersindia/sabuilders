// Accessible two-state toggle switch: left/right slots, sliding thumb.
export default function ToggleSwitch({ checked, onChange, left, right, label, title }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      title={title || label}
      className="switch"
      onClick={() => onChange(!checked)}
    >
      <span className="switch-thumb" aria-hidden="true" />
      <span className={"switch-slot" + (!checked ? " on" : "")}>{left}</span>
      <span className={"switch-slot" + (checked ? " on" : "")}>{right}</span>
    </button>
  );
}
