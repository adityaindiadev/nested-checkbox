# nested-checkbox

![Nested Checkbox Demo](https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExcmI0dHNydTg5ZmtmdnBlaGN5YmF5N3U0bmw2MGZpMmJpZjZ0bGNmZyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/A327phOJBJsDsqajee/giphy.gif)

# 🧩 Nested CheckBox Component (React)

This is a customizable **nested checkbox tree** component built in React. It supports multi-level checkboxes where each checkbox can have child checkboxes. Selecting or deselecting a parent will update its children, and children can also update their parent's state based on their selection status.

## ✨ Features

- Supports **infinite nesting** of checkboxes.
- Syncs parent and child checkbox states.
- Prevents circular updates using `useRef` flagging.
- Callback hooks for parent-child communication.
- Easy to extend and integrate.

## 📦 Props

| Prop                          | Type                                      | Description                                                                 |
|------------------------------|-------------------------------------------|-----------------------------------------------------------------------------|
| `data`                       | `Array`                                   | Array of checkbox items. Each item can have nested `values`.               |
| `isParentChecked`            | `boolean`                                 | Determines whether the parent checkbox is currently checked.               |
| `isCheckInitiatedByChildRef` | `React.RefObject<boolean>`                | A `ref` flag to track if a check is triggered by a child update.           |
| `resetIsCheckInitiatedByChildRef` | `(status?: boolean, logMsg?: string) => void` | Function to reset the `isCheckInitiatedByChildRef` ref.                    |
| `parentCheckHandler`         | `(value: string \| number, checked: boolean, index: number) => void` | Callback to update the parent when a child checkbox is toggled. |
| `parentId`                   | `string`                                  | Identifier for the parent checkbox (used internally).                      |
| `timeStamp`                  | `number`                                  | Optional timestamp for logging or versioning purposes.                     |

## 📁 File Structure


## 🧪 Sample Usage


---

```jsx
import React, { useRef } from 'react';
import CheckBox from './CheckBox';

const data = [
  {
    id: 'fruit',
    label: 'Fruits',
    values: [
      { id: 'apple', label: 'Apple', values: [] },
      { id: 'banana', label: 'Banana', values: [] },
    ],
  },
  {
    id: 'vegetables',
    label: 'Vegetables',
    values: [],
  },
];

export default function App() {
  const childRef = useRef(false);

  const resetRef = (status = false, logMsg = '') => {
    childRef.current = status;
    if (logMsg) console.log(logMsg);
  };

  const handleParentCheck = (value, checked, index) => {
    console.log(`Parent ${value} is ${checked ? 'checked' : 'unchecked'}`);
  };

  return (
    <div>
      <h2>Nested Checkboxes</h2>
      <CheckBox
        data={data}
        isParentChecked={false}
        isCheckInitiatedByChildRef={childRef}
        resetIsCheckInitiatedByChildRef={resetRef}
        parentCheckHandler={handleParentCheck}
      />
    </div>
  );
}

```

---

## 🛠️ Utility: myLog

If you want to track logs for nested components, you can use a custom logger like this:

```jsx

function myLog(myLogId = '', ...args) {
  console.log({ myLogId }, ...args);
}

```

Pass a unique myLogId to distinguish between parent and child levels.


