export function generateAttributes(attributeSet, func = null, itemId = "") {
  return attributeSet.items.map((attr) => {
    return (
      <div key={itemId + attributeSet.id + attr.id} onChange={func}>
        <input
          type="radio"
          value={attr.id}
          name={itemId + attributeSet.id}
          id={itemId + attributeSet.id + attr.id}
          className="displayNone"
          checked={attr.isChosen}
          disabled={!func}
        />
        {attributeSet.type === "swatch" ? (
          <label
            htmlFor={itemId + attributeSet.id + attr.id}
            className="swatchAttr"
            style={{ backgroundColor: attr.value }}
          ></label>
        ) : (
          <label htmlFor={itemId + attributeSet.id + attr.id}>
            {attr.displayValue}
          </label>
        )}
      </div>
    );
  });
}
