useCallback
===========



```tsx
import React, { useCallback } from 'react';
import { t } from '../../utils';
import { useDispatch } from 'react-redux';
import { updateAppProjectMonthsFilter } from '../../../actions';

const style = {marginRight: 6};

/** Opens/closes a projectMonth */
export const ToggleProjectMonthButton = ({ month, toggleOpen }: { month: string; toggleOpen: boolean }) => {
  // Not actually used because this exercise is starting to hurt readability
  // (it was also slower using the useCallback)
  // Normal handler:
  // const onToggle = () => {
  //   dispatch(updateAppProjectMonthsFilter(month, toggleOpen));
  // };

  // Cached handler:
  const dispatch = useDispatch();
  const onToggle = useCallback(() => {
    dispatch(updateAppProjectMonthsFilter(month, toggleOpen));
  }, [dispatch, month, toggleOpen]);

  if (!toggleOpen) {
    return (
      <button type="button" onClick={onToggle} className="btn btn-outline-info">
        <i className="fa fa-toggle-on fa-1x" style={style} />
        {t('projectMonth.list.closeList')}
      </button>
    );
  }

  return (
    <button type="button" onClick={onToggle} className="btn btn-outline-info">
      <i className="fa fa-toggle-off fa-1x" style={style} />
      {t('projectMonth.list.openList')}
    </button>
  );
};

```
