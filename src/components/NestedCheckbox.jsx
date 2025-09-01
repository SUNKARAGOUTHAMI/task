import { useState, useCallback } from "react";


const NestedCheckbox = () => {
  const initialData = {
    selectAll: false,
    selectAllIndeterminate: false,
    categories: {
      fruits: {
        label: "Fruits",
        checked: false,
        indeterminate: false,
        children: {
          apple: { label: "Apple", checked: false },
          banana: { label: "Banana", checked: false },
          orange: { label: "Orange", checked: false },
          mango: { label: "Mango", checked: false },
        },
      },
      vegetables: {
        label: "Vegetables",
        checked: false,
        indeterminate: false,
        children: {
          carrot: { label: "Carrot", checked: false },
          tomato: { label: "Tomato", checked: false },
          onion: { label: "Onion", checked: false },
          potato: { label: "Potato", checked: false },
        },
      },
    },
  };

  const [checkboxState, setCheckboxState] = useState(initialData);

  const getAllChildren = useCallback(
    (categoryKey) => Object.keys(checkboxState.categories[categoryKey].children),
    [checkboxState.categories]
  );

  const getAllCategories = useCallback(
    () => Object.keys(checkboxState.categories),
    [checkboxState.categories]
  );

  const getAllItems = useCallback(
    () =>
      getAllCategories().flatMap((categoryKey) =>
        getAllChildren(categoryKey).map((childKey) => ({ categoryKey, childKey }))
      ),
    [getAllCategories, getAllChildren]
  );

  // Update parent state dynamically inside state setter
  const handleItemChange = (categoryKey, childKey, e) => {
    const checked = e.target.checked;

    setCheckboxState((prev) => {
      const newState = { ...prev, categories: { ...prev.categories } };

      // Update child
      newState.categories[categoryKey] = {
        ...newState.categories[categoryKey],
        children: {
          ...newState.categories[categoryKey].children,
          [childKey]: {
            ...newState.categories[categoryKey].children[childKey],
            checked,
          },
        },
      };

      // Update parent category
      const childrenKeys = Object.keys(newState.categories[categoryKey].children);
      const checkedChildren = childrenKeys.filter((key) => newState.categories[categoryKey].children[key].checked);

      newState.categories[categoryKey].checked = checkedChildren.length === childrenKeys.length;
      newState.categories[categoryKey].indeterminate =
        checkedChildren.length > 0 && checkedChildren.length < childrenKeys.length;

      // Update selectAll
      const allItems = [];
      Object.keys(newState.categories).forEach((catKey) =>
        Object.keys(newState.categories[catKey].children).forEach((child) =>
          allItems.push(newState.categories[catKey].children[child].checked)
        )
      );

      const checkedItems = allItems.filter(Boolean);
      newState.selectAll = checkedItems.length === allItems.length;
      newState.selectAllIndeterminate = checkedItems.length > 0 && checkedItems.length < allItems.length;

      return newState;
    });
  };

  const handleCategoryChange = (categoryKey, e) => {
    const checked = e.target.checked;

    setCheckboxState((prev) => {
      const newState = { ...prev, categories: { ...prev.categories } };

      // Update category and all children
      newState.categories[categoryKey] = {
        ...newState.categories[categoryKey],
        checked,
        indeterminate: false,
        children: Object.fromEntries(
          Object.entries(newState.categories[categoryKey].children).map(([key, child]) => [
            key,
            { ...child, checked },
          ])
        ),
      };

      // Update selectAll
      const allItems = [];
      Object.keys(newState.categories).forEach((catKey) =>
        Object.keys(newState.categories[catKey].children).forEach((child) =>
          allItems.push(newState.categories[catKey].children[child].checked)
        )
      );

      const checkedItems = allItems.filter(Boolean);
      newState.selectAll = checkedItems.length === allItems.length;
      newState.selectAllIndeterminate = checkedItems.length > 0 && checkedItems.length < allItems.length;

      return newState;
    });
  };

  const handleSelectAllChange = (e) => {
    const checked = e.target.checked;

    setCheckboxState((prev) => {
      const newState = { ...prev, selectAll: checked, selectAllIndeterminate: false, categories: { ...prev.categories } };

      Object.keys(newState.categories).forEach((categoryKey) => {
        newState.categories[categoryKey].checked = checked;
        newState.categories[categoryKey].indeterminate = false;
        Object.keys(newState.categories[categoryKey].children).forEach((childKey) => {
          newState.categories[categoryKey].children[childKey].checked = checked;
        });
      });

      return newState;
    });
  };

  return (
    <div style={{ padding: "20px", border: "1px solid #ccc", borderRadius: "8px", maxWidth: "400px" }}>
      <h3>Nested Checkbox Demo</h3>

      <div style={{ margin: "10px 0" }}>
        <input
          type="checkbox"
          id="select-all"
          checked={checkboxState.selectAll}
          ref={(el) => el && (el.indeterminate = checkboxState.selectAllIndeterminate)}
          onChange={handleSelectAllChange}
        />
        <label htmlFor="select-all" style={{ marginLeft: "8px", cursor: "pointer" }}>
          Select All
        </label>
      </div>

      {getAllCategories().map((categoryKey) => {
        const category = checkboxState.categories[categoryKey];
        return (
          <div key={categoryKey} style={{ marginLeft: "10px", marginBottom: "10px" }}>
            <div>
              <input
                type="checkbox"
                id={categoryKey}
                checked={category.checked}
                ref={(el) => el && (el.indeterminate = category.indeterminate)}
                onChange={(e) => handleCategoryChange(categoryKey, e)}
              />
              <label htmlFor={categoryKey} style={{ marginLeft: "8px", cursor: "pointer", fontWeight: "bold" }}>
                {category.label}
              </label>
            </div>

            <div style={{ marginLeft: "20px", marginTop: "4px" }}>
              {Object.keys(category.children).map((childKey) => {
                const child = category.children[childKey];
                return (
                  <div key={childKey}>
                    <input
                      type="checkbox"
                      id={`${categoryKey}-${childKey}`}
                      checked={child.checked}
                      onChange={(e) => handleItemChange(categoryKey, childKey, e)}
                    />
                    <label htmlFor={`${categoryKey}-${childKey}`} style={{ marginLeft: "6px", cursor: "pointer" }}>
                      {child.label}
                    </label>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}

      <div style={{ marginTop: "20px", padding: "10px", border: "1px solid #eee", borderRadius: "4px" }}>
        <strong>Selected Items:</strong>
        <div>
          {getAllItems()
            .filter(({ categoryKey, childKey }) => checkboxState.categories[categoryKey].children[childKey].checked)
            .map(({ categoryKey, childKey }) => checkboxState.categories[categoryKey].children[childKey].label)
            .join(", ") || "None selected"}
        </div>
      </div>
    </div>
  );
};

export default NestedCheckbox;
