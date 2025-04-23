import React, { useEffect, useState } from "react";

export default function CheckBox({
  data = [],
  isParentChecked = false,
  parentCheckHandler = (
    value: string | number,
    checked: boolean,
    index: number
  ) => {},
  parentId = "",
}) {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [
    shouldInitiateParentCheckForChild,
    setShouldInitiateParentCheckForChild,
  ] = useState([]);
  const handleChangeForChild = (
    value: string | number,
    checked: boolean,
    index: number
  ) => {
    console.log("handleChangeForChild", value, checked);

    if (checked) {
      setSelectedOptions([...selectedOptions, value]);
    } else {
      setSelectedOptions(selectedOptions.filter((option) => option !== value));
    }
  };
  function parentCheckOperation() {
    if (isParentChecked) {
      const valueArray = data.map((option, index) => option.id);
      console.log({ valueArray, parentId });
      setSelectedOptions(valueArray);
    } else setSelectedOptions([]);
  }
  useEffect(() => {
    // console.log({ isParentChecked });
    parentCheckOperation();
    return () => {};
  }, [isParentChecked]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputoptionent>,
    index: number
  ) => {
    const { value, checked } = event.target;
    console.log({ value, checked });
    if (checked) {
      parentCheckHandler(
        parentId,
        selectedOptions.length + 1 === data.length,
        -1
      );
      setSelectedOptions([...selectedOptions, value]);
      setShouldInitiateParentCheckForChild([...selectedOptions, value]);
    } else {
      parentCheckHandler(
        parentId,
        selectedOptions.length - 1 === data.length,
        -1
      );
      setSelectedOptions(selectedOptions.filter((option) => option !== value));
      setShouldInitiateParentCheckForChild(
        selectedOptions.filter((option) => option !== value)
      );
    }
    // setShouldInitiateParentCheckForChild(checked);
  };

  return (
    <div style={{ marginLeft: 20 }}>
      {data.map((option, index) => {
        return (
          <React.Fragment key={option.id}>
            <label>
              <input
                type="checkbox"
                value={option.id}
                checked={selectedOptions.includes(option.id)}
                onChange={(event) => handleChange(event, index)}
              />
              {option?.label}
            </label>
            {option?.values?.length > 0 && (
              <CheckBox
                data={option?.values}
                isParentChecked={shouldInitiateParentCheckForChild.includes(
                  option.id
                )}
                parentId={option.id}
                parentCheckHandler={handleChangeForChild}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
