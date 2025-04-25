import React, { useEffect, useRef, useState } from "react";

function myLog(myLogId = '', ...args) {
  console.log({ myLogId }, ...args)
}

export default function CheckBox({
  data = [],
  isParentChecked = false,
  isCheckInitiatedByChildRef = { current: false },
  resetIsCheckInitiatedByChildRef = (status = false, logMsg = undefined) => { },
  parentCheckHandler = (
    value: string | number,
    checked: boolean,
    index: number
  ) => { },
  parentId = "",
  timeStamp = Date.now()
}) {
  //console.log({ isCheckInitiatedByChildRef });

  const [selectedOptions, setSelectedOptions] = useState([]);
  const [
    shouldInitiateParentCheckForChild,
    setShouldInitiateParentCheckForChild,
  ] = useState([]);
  const isCheckInitiatedByChild = useRef(false);

  function resetIsCheckInitiatedByChild(status = false, logMsg = undefined) {
    //console.log("resetIsCheckInitiatedByChild", logMsg, status);

    isCheckInitiatedByChild.current = status
  }
  //console.log("isCheckInitiatedByChild", isCheckInitiatedByChild);

  const handleChangeForChild = (
    value: string | number,
    checked: boolean,
    index: number
  ) => {
    resetIsCheckInitiatedByChild(true)
    initiateChanges(value, checked)

    // ---------------------
    //console.log("handleChangeForChild", value, checked);

    // if (checked) {
    //   setSelectedOptions([...selectedOptions, value]);
    // } else {
    //   setSelectedOptions(selectedOptions.filter((option) => option !== value));
    // }
    // ---------------------
  };
  function parentCheckOperation() {
    resetIsCheckInitiatedByChild()
    // myLog('', "parentCheckOperation executed")
    if (isParentChecked) {
      const valueArray = data.map((option, index) => option.id);
      //console.log({ valueArray, parentId });
      setSelectedOptions(valueArray);
    } else setSelectedOptions([]);
  }
  useEffect(() => {
    myLog('useeffect', parentId, { timeStamp }, isCheckInitiatedByChildRef)
    // //console.log({ isParentChecked });
    if (isCheckInitiatedByChildRef.current) {
      resetIsCheckInitiatedByChildRef(false, "invoked by resetIsCheckInitiatedByChildRef")
    } else {
      parentCheckOperation()
    }

    return () => {
      // resetIsCheckInitiatedByChildRef()
      myLog('returnuseeffect', parentId, { timeStamp }, isCheckInitiatedByChildRef)
    }
  }, [isParentChecked]);

  function initiateChanges(value: string | number,
    checked: boolean) {
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
  }

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    resetIsCheckInitiatedByChild()
    const { value, checked } = event.target;
    //console.log({ value, checked });
    myLog('handleChange', { clickedValue: value })
    initiateChanges(value, checked)
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
                isParentChecked={selectedOptions.includes(option.id)}
                parentId={option.id}
                parentCheckHandler={handleChangeForChild}
                isCheckInitiatedByChildRef={isCheckInitiatedByChild}
                resetIsCheckInitiatedByChildRef={resetIsCheckInitiatedByChild}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
