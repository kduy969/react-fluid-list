import React, {useRef, useEffect, useCallback} from "react";
import css from './PanView.module.css';
import {useAutoZoomPan} from "../hooks/useAutoZoomPan";


export default React.memo(({children, className}) => {
  const ref = useRef(null);
  const panRef = useRef(null);
  useAutoZoomPan(ref, panRef, {throttle: 30});
  return <div
    ref={ref}
    className={css.container + ' ' + className || ''}
  >
    <div
      ref={panRef}
      className={css.panSection}>
      {children}
    </div>
  </div>
});

